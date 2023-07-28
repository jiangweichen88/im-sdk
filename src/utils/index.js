export function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.onload = () => resolve()

    script.onerror = () => reject(new Error(`Load script from ${url} failed`))

    script.src = url
    const head = document.head || document.getElementsByTagName('head')[0]
    // type="text/javascript" charset="utf-8"
    ;(document.body || head).appendChild(script)
  })
}

// <script src="./sdk/thirdpart/uuid.js"></script>
// <script src="./sdk/thirdpart/hashmap.js"></script>
// <script src="./sdk/module/mb_constants.js?101"></script>
// <script src="./sdk/module/mb_core.js?99"></script>
// <script src="./sdk/module/mb_daemon_auto_relogin.js?99"></script>
// <script src="./sdk/module/mb_daemon_keep_alive.js?101"></script>
// <script src="./sdk/module/mb_daemon_qos_recieve.js?99"></script>
// <script src="./sdk/module/mb_daemon_qos_send.js?99"></script>
// <script src="./sdk/module/mb_data_reciever.js?100"></script>
// <script src="./sdk/module/mb_data_sender.js?99"></script>
// <script src="./sdk/module/mb_socket_provider.js?99"></script>
// <script src="./sdk/module/mb_utils.js?99"></script>
// <script src="./sdk/mobileimsdk-client-sdk.js?100"></script>
export function loadResourceList(RESOURCE_LIST, cb) {
  return RESOURCE_LIST.reduce((res, el) => res.then(() => loadScript(el)), Promise.resolve())
    .then(() => {
      console.log('success')
      cb()
    })
    .catch((error) => {
      console.error('图标加载失败:', error.name, error.message)
      return Promise.reject(error)
    })
}
