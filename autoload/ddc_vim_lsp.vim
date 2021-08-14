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

function! ddc_vim_lsp#request(plugin_name, method_name) abort
  let l:servers = lsp#get_allowed_servers()
  if len(l:servers) == 0
    return
  endif

  " NOTE: choose first lsp server
  let l:server_name = l:servers[0]
  let l:server = lsp#get_server_info(l:server_name)
  let l:position = lsp#get_position()

  call lsp#send_request(l:server_name, {
  	\ 'method': 'textDocument/completion',
  	\ 'params': {
	\   'textDocument': lsp#get_text_document_identifier(),
  	\   'position': l:position,
  	\ },
  	\ 'on_notification': function('ddc_vim_lsp#_callback', [l:server, l:position, a:plugin_name, a:method_name]),
  	\ })
endfunction
