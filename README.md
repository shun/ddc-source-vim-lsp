# ddc-vim-lsp

vim-lsp for ddc.vim.
- ddc.vim : v0.6.0

<img src="https://user-images.githubusercontent.com/212602/131358924-a62bd611-81ea-413b-aba5-2439fc42ae66.png" width="600"><br>

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

### vim-lsp

https://github.com/prabirshrestha/vim-lsp

## Recommended

### vim-lsp-settings

https://github.com/mattn/vim-lsp-settings

## Configuration

```
    call ddc#custom#patch_global('sources', ['ddc-vim-lsp'])
    call ddc#custom#patch_global('sourceOptions', {
        \ 'ddc-vim-lsp': {
        \   'matchers': ['matcher_head'],
        \   'mark': 'lsp',
        \ },
        \ })
```

## Screenshots

<img src="https://user-images.githubusercontent.com/212602/131840821-e3a94117-2eb9-44b9-8da6-3b14ed15b893.png"><br>

## Author

KUDO Shunsuke (skudo_xx)

