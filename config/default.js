export const serverIp =
  (process.env === 'production') ?
    '39.105.181.82' :
      (
        process.env === 'test' ?
          '48.98.50.170' :
            (
              process.env === 'development' ?
                '127.0.0.1' :
                  ''
            )
      )