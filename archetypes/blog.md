---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
tags: []
authors: []
type: "blog"
layout: "single"
archives: ["{{ .Date.Format "2006-01" }}"]
---