# ddc-vim-lsp

vim-lsp for ddc.vim.
- ddc.vim : v2.0.0

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
    e.g.

    call ddc#custom#patch_global('sources', ['vim-lsp'])
    call ddc#custom#patch_global('sourceOptions', {
        \ 'vim-lsp': {
        \   'matchers': ['matcher_head'],
        \   'mark': 'lsp',
        \ },
        \ })

    " if you want to use the unsupported CompleteProvider Server,
    " set true by'ignoreCompleteProvider'.
    call ddc#custom#patch_filetype(['css'], {
       \ 'sourceParams': {
       \   'vim-lsp': {
       \     'ignoreCompleteProvider': v:true,
       \   },
       \ },
       \ })
```

ddc.vim remove duplicated keyword by default.
If you want to list up both of them, please add `'dup': v:true` .

## Screenshots

<img src="https://user-images.githubusercontent.com/212602/131840821-e3a94117-2eb9-44b9-8da6-3b14ed15b893.png"><br>

## Author

KUDO Shunsuke (skudo_xx)

