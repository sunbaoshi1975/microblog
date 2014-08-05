/**
 * Created by sunboss on 2014/8/4.
 */
var config = {
    "appenders": [
        {
            "type": "clustered",
            "appenders": [
                {   "type": "console",
                    "layout": {
                        "type": "pattern",
                        "pattern": "%[%d{ABSOLUTE} (%x{pid}) [%5.5p] %c -%] %m",
                        "tokens": {
                            "pid": function () {
                                return process.pid;
                            }
                        }
                    }
                },
                {
                    "type": "dateFile",
                    "layout": {
                        "type": "pattern",
                        "pattern": "%[%d{ABSOLUTE} (%x{pid}) [%5.5p] %c -%] %m",
                        "tokens": {
                            "pid": function () {
                                return process.pid;
                            }
                        }
                    },
                    "filename": "log/access",
                    "pattern": "-yyyy-MM-dd.log",
                    "alwaysIncludePattern": true,
                    "category": "http"
                },
                {
                    "type": "file",
                    "layout": {
                        "type": "pattern",
                        "pattern": "%[%d{ISO8601_WITH_TZ_OFFSET} (%x{pid}) [%5.5p] %c -%] %m",
                        "tokens": {
                            "pid": function () {
                                return process.pid;
                            }
                        }
                    },
                    "filename": "log/app.log",
                    "maxLogSize": 10485760,
                    "numBackups": 3
                },
                {
                    "type": "logLevelFilter",
                    "level": "ERROR",
                    "appender": {
                        "type": "file",
                        "layout": {
                            "type": "pattern",
                            "pattern": "%[%d{ISO8601_WITH_TZ_OFFSET} (%x{pid}) [%5.5p] %c -%] %m",
                            "tokens": {
                                "pid": function () {
                                    return process.pid;
                                }
                            }
                        },
                        "filename": "log/errors.log"
                    }
                }
            ]
        }
    ]
};

module.exports = config;