function! ddc_vim_lsp#_callback(server, position, plugin_name, method_name, data) abort
  if lsp#client#is_error(a:data) || !has_key(a:data, 'response') || !has_key(a:data['response'], 'result') || !has_key(a:data['response']['result'], 'items')
    return
  endif

  let l:options = {
      \ 'server': a:server,
      \ 'position': a:position,
      \ 'response': a:data['response'],
      \ }
  let lspitems = lsp#omni#get_vim_completion_items(l:options)['items']
  call denops#request(a:plugin_name, a:method_name, [lspitems])
endfunction

function! ddc_vim_lsp#request(server_name, plugin_name, method_name) abort
  let l:server = lsp#get_server_info(a:server_name)
  let l:position = lsp#get_position()

  call lsp#send_request(a:server_name, {
    \ 'method': 'textDocument/completion',
    \ 'params': {
    \   'textDocument': lsp#get_text_document_identifier(),
    \   'position': l:position,
    \ },
    \ 'on_notification': function('ddc_vim_lsp#_callback', [l:server, l:position, a:plugin_name, a:method_name]),
    \ })
endfunction
