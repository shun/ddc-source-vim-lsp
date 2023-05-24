# v0.1.0

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
  autoload ->> vimlsp: call lsp#send_request
  source --> ddc: return empty candidates

  ...

  group lsp sequence
  vimlsp ->> lsp:
  lsp ->> vimlsp:
  end

  vimlsp ->> autoload: callback
  autoload -> vimlsp: call lsp#omni#get_vim_completion_items
  return
  autoload -> core: store lsp items
  note right
  store it on 
  vim global variable
  endnote

  autoload -> ddc: call ddc#refresh_candidates
  return
  ...

  ddc -> source: gatherCandidates
  note right
  "gatnerCandidates" is called automatically
  to trigger by "ddc#refresh_candidates".
  endnote
  source -> denops: get lsp items
  denops -> core: get variable
  return variable
  denops --> source: lsp items
  source --> ddc: return candidates
```

# v0.0.1

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
autoload ->> vimlsp: call lsp#send_request

group lsp sequence
vimlsp ->> lsp:
lsp ->> vimlsp:
end

vimlsp ->> autoload: callback
autoload -> vimlsp: call lsp#omni#get_vim_completion_items
return
autoload ->> source: call anonymous func
source -> source: call toCandidates
source ->> ddc: return candidates
```
