const lang = {
    START: "Inizio",
    END: "Fine",
    DEFINE: "Definisci",
    READ: "Leggi",
    PRINT: "Stampa",
    CALCULATE: "Calcola:",
    IF: "Se",
    THEN: "allora:",
    ELSE: "Altrimenti:",
    WHILE: "Mentre",
    DO: "esegui",
    BLOCK_PREFIX: "- "
};

$(document).ready(() => {
    $("#sourceCode").html("Inizio\nStampa (): \"Ciao, Mondo!\"\nFine");
});

class Compiler {
    getPrecedence(op) {
        if (["==", ">", "<"].includes(op)) return 1;
        if (["+", "-"].includes(op)) return 2;
        if (["*", "/"].includes(op)) return 3;
        return 0;
    }

    infixToRPN(infix, lineNum) {
        let operators = [];
        let output = [];
        let tokens = infix.match(/[a-zA-Z_]\w*|\d+(?:\.\d+)?|==|[><+\-*/()]/g);

        if (!tokens) throw new Error(`Riga ${lineNum}: Espressione matematica non valida.`);

        for (let token of tokens) {
            if (/^[a-zA-Z0-9_.]+$/.test(token)) {
                output.push(token);
            } else if (token === "(") {
                operators.push(token);
            } else if (token === ")") {
                let foundOpen = false;
                while (operators.length && operators[operators.length - 1] !== "(") {
                    output.push(operators.pop());
                    foundOpen = true;
                }
                if (!operators.length && !foundOpen) throw new Error(`Riga ${lineNum}: Parentesi chiusa ')' senza corrispondenza.`);
                operators.pop();
            } else {
                while (operators.length && this.getPrecedence(operators[operators.length - 1]) >= this.getPrecedence(token)) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }
        while (operators.length) {
            let op = operators.pop();
            if (op === "(") throw new Error(`Riga ${lineNum}: Parentesi aperta '(' non chiusa.`);
            output.push(op);
        }
        return output.join(" ");
    }

    compile(sourceCode) {
        let assembly = [];
        let pendingIfJumps = [];
        let pendingElseJumps = [];
        let pendingWhiles = [];

        sourceCode = sourceCode.replace(/[“”]/g, '"');
        let rawLines = sourceCode.split('\n');

        for (let i = 0; i < rawLines.length; i++) {
            let line = rawLines[i].trim();
            let lineNum = i + 1;

            if (line === "" || line === lang.START || line === lang.END) continue;

            let isBlock = line.startsWith(lang.BLOCK_PREFIX);

            if (!isBlock && line !== lang.ELSE) {
                while (pendingWhiles.length > 0) {
                    let w = pendingWhiles.pop();
                    assembly.push(`JUMP -> ${w.start}`);
                    assembly[w.exit] = assembly[w.exit].replace("???", assembly.length);
                }
                
                pendingElseJumps.forEach(idx => assembly[idx] = assembly[idx].replace("???", assembly.length));
                pendingIfJumps.forEach(idx => assembly[idx] = assembly[idx].replace("???", assembly.length));
                pendingElseJumps = []; pendingIfJumps = [];
            }

            if (isBlock) line = line.substring(lang.BLOCK_PREFIX.length).trim();

            if (line.startsWith(lang.DEFINE)) {
                let match = line.match(new RegExp(`^${lang.DEFINE}\\s*\\((.*?)\\)$`));
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi 'Definisci' errata.`);
                let vars = match[1].split(',');
                vars.forEach(v => { if (v.trim() !== "") assembly.push(`DEF ${v.trim()}`); });
            }
            else if (line.startsWith(lang.READ)) {
                let match = line.match(new RegExp(`^${lang.READ}\\s*\\((.*?)\\):\\s*"(.*?)"$`));
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi 'Leggi' errata.`);
                let vars = match[1].replace(/\s/g, '');
                assembly.push(`READ "${match[2]}" ${vars}`);
            }
            else if (line.startsWith(lang.PRINT)) {
                let match = line.match(new RegExp(`^${lang.PRINT}\\s*\\((.*?)\\):\\s*"(.*?)"$`));
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi 'Stampa' errata.`);
                let vars = match[1] ? match[1].replace(/\s/g, '') : "";
                assembly.push(`PRINT "${match[2]}" ${vars}`);
            }
            else if (line.startsWith(lang.CALCULATE)) {
                let match = line.match(new RegExp(`^${lang.CALCULATE}\\s*\\((.*?)\\)$`));
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi 'Calcola' errata.`);
                let expr = match[1];
                let [dest, mathExpr] = expr.split('=');
                let rpn = this.infixToRPN(mathExpr.trim(), lineNum);
                assembly.push(`CALC ${dest.trim()} ${rpn}`);
            }
            else if (line.startsWith(lang.IF)) {
                let match = line.match(new RegExp(`^${lang.IF}\\s*\\((.*?)\\),\\s*${lang.THEN}$`));
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi '${lang.IF}' errata.`);
                let rpnCond = this.infixToRPN(match[1], lineNum);
                assembly.push(`JUMPFALSE ${rpnCond} -> ???`);
                pendingIfJumps.push(assembly.length - 1);
            }
            else if (line === lang.ELSE) {
                if (pendingIfJumps.length === 0) throw new Error(`Riga ${lineNum}: Trovato '${lang.ELSE}' senza '${lang.IF}'.`);
                assembly.push(`JUMP -> ???`);
                pendingElseJumps.push(assembly.length - 1);
                let idx = pendingIfJumps.pop();
                assembly[idx] = assembly[idx].replace("???", assembly.length);
            }
            else if (line.startsWith(lang.WHILE)) {
                let parolaEsegui = lang.DO.replace(":", "");
                
                let match = line.match(new RegExp(`^${lang.WHILE}\\s*\\((.*?)\\)[,\\s]*${parolaEsegui}:?$`));
            
                if (!match) throw new Error(`Riga ${lineNum}: Sintassi errata. Prova con: Mentre (condizione), esegui:`);
                
                let rpnCond = this.infixToRPN(match[1], lineNum);
                let startIdx = assembly.length;
                assembly.push(`JUMPFALSE ${rpnCond} -> ???`);
                pendingWhiles.push({ start: startIdx, exit: assembly.length - 1 });
            }
            else {
                throw new Error(`Riga ${lineNum}: Comando non riconosciuto -> "${line}"`);
            }
        }

        while (pendingWhiles.length > 0) {
            let w = pendingWhiles.pop();
            assembly.push(`JUMP -> ${w.start}`);
            assembly[w.exit] = assembly[w.exit].replace("???", assembly.length);
        }
        pendingElseJumps.forEach(idx => assembly[idx] = assembly[idx].replace("???", assembly.length));
        pendingIfJumps.forEach(idx => assembly[idx] = assembly[idx].replace("???", assembly.length));

        assembly.push("HALT");
        return assembly;
    }
}

class VirtualMachine {
    constructor() { this.memory = {}; this.outputDiv = document.getElementById("output"); }
    printToConsole(text) { this.outputDiv.innerHTML += text + "<br>"; this.outputDiv.scrollTop = this.outputDiv.scrollHeight; }

    async waitForInput(promptLabel) {
        return new Promise((resolve) => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<span>${promptLabel}</span> <input type="text" class="term-input" autocomplete="off">`;
            this.outputDiv.appendChild(wrapper);
            const inputElement = wrapper.querySelector("input");
            inputElement.focus();
            this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
            inputElement.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    const value = inputElement.value;
                    wrapper.innerHTML = `<span>${promptLabel}</span> <span>${value}</span>`;
                    resolve(value);
                }
            });
        });
    }

    evaluateRPN(rpn) {
        let stack = [];
        let tokens = rpn.split(" ");
        for (let token of tokens) {
            if (token === "") continue;
            if (["+", "-", "*", "/", ">", "<", "=="].includes(token)) {
                let right = stack.pop(); let left = stack.pop();
                if (token === "+") stack.push(left + right); if (token === "-") stack.push(left - right);
                if (token === "*") stack.push(left * right); if (token === "/") stack.push(left / right);
                if (token === ">") stack.push(left > right ? 1 : 0); if (token === "<") stack.push(left < right ? 1 : 0);
                if (token === "==") stack.push(left === right ? 1 : 0);
            } else { stack.push(this.memory.hasOwnProperty(token) ? this.memory[token] : parseFloat(token)); }
        }
        return stack.length ? stack.pop() : 0;
    }

    async execute(assembly) {
        this.memory = {}; let pc = 0; this.outputDiv.innerHTML = "";
        while (pc < assembly.length) {
            let instruction = assembly[pc];
            if (instruction === "HALT") break;

            if (instruction.startsWith("DEF")) { this.memory[instruction.split(" ")[1]] = 0; pc++; }
            else if (instruction.startsWith("READ")) {
                let match = instruction.match(/"(.*?)"\s*(.*)/);
                this.printToConsole(match[1]);
                let vars = match[2].split(',');
                for (let v of vars) {
                    if (v) { let val = await this.waitForInput(`> ${v} = `); this.memory[v] = parseFloat(val) || 0; }
                }
                pc++;
            }
            else if (instruction.startsWith("PRINT")) {
                let match = instruction.match(/"(.*?)"\s*(.*)/);
                let msg = match[1]; let vars = match[2] ? match[2].split(',') : [];
                vars.forEach((v, i) => { msg = msg.replace(`[${i + 1}]`, this.memory[v] !== undefined ? this.memory[v] : ""); });
                this.printToConsole(msg); pc++;
            }
            else if (instruction.startsWith("CALC")) {
                let parts = instruction.substring(5).split(" ");
                this.memory[parts[0]] = this.evaluateRPN(parts.slice(1).join(" ")); pc++;
            }
            else if (instruction.startsWith("JUMPFALSE")) {
                let parts = instruction.substring(10).split(" -> ");
                if (this.evaluateRPN(parts[0]) === 0) pc = parseInt(parts[1]); else pc++;
            }
            else if (instruction.startsWith("JUMP")) {
                pc = parseInt(instruction.split(" -> ")[1]);
            }
            else { pc++; }
        }
        this.printToConsole("<br><i style='color:#777;'>--- Esecuzione Terminata ---</i>");
    }
}

async function eseguiProgramma() {
    const runBtn = document.getElementById("runBtn");
    runBtn.disabled = true; runBtn.innerText = "In Esecuzione...";
    let sourceCode = document.getElementById("sourceCode").value;

    try {
        let compiler = new Compiler();
        let assembly = compiler.compile(sourceCode);

        let asmText = assembly.map((inst, i) => `[${i.toString().padStart(2, '0')}] ${inst}`).join('\n');
        document.getElementById("bytecodeOutput").innerText = asmText;

        let vm = new VirtualMachine();
        await vm.execute(assembly);
    } catch (e) {
        document.getElementById("output").innerHTML = `<span style="color: #ff5555; font-weight: bold;">[ERRORE DI COMPILAZIONE]</span><br><span style="color: #ffaaaa;">${e.message}</span>`;
        document.getElementById("bytecodeOutput").innerText = "Compilazione fallita.";
    } finally {
        runBtn.disabled = false; runBtn.innerText = "Compila ed Esegui";
    }
}