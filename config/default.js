console.log('process.env.NODE_ENV', process.env.NODE_ENV)
exports.serverIp =
  (process.env.NODE_ENV === 'production') ?
    '48.98.50.170' :
      (
        process.env.NODE_ENV === 'test' ?
          '48.98.50.170' :
            (
              process.env.NODE_ENV === 'development' ?
                '48.98.50.170' :
                  ''
            )
      )