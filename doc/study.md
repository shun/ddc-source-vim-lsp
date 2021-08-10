
```plantuml

box "vim/neovim" #A5D6A7
  participant core
end box

box "ddc-vim-lsp" #FFCCBC
  participant autoload
  participant plugin
  participant source
end box

box "ddc" #B2EBF2
  participant ddc
end box

box "denops" #B2EBF2
  participant denops
end box

box "vim-lsp" #B2EBF2
  participant vimlsp as "vim-lsp"
end box

box "lsp" #BBDEFB
  participant lsp as "lsp server"
end box

== input text ==
core -> ddc: detect input text
ddc -> source: gatherCandidates
source -> autoload: call ddc_vim_lsp#request
autoload ->> vimlsp: call send_request

group lsp sequence
vimlsp ->> lsp:
lsp ->> vimlsp:
end

vimlsp ->> autoload: call back
autoload ->> source: call anonymous func
source -> source: call toCandidates
source ->> ddc: return candidates
```
