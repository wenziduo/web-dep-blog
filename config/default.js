console.log('process.env.NODE_ENV', process.env.NODE_ENV)
exports.serverIp =
  (process.env.NODE_ENV === 'production') ?
    '47.98.50.170:8019' :
      (
        process.env.NODE_ENV === 'test' ?
          '47.98.50.170:8019' :
            (
              process.env.NODE_ENV === 'development' ?
                '47.98.50.170:8019' :
                  ''
            )
      )