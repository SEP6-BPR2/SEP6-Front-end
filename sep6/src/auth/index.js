( function (global, factory) {
     if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        global.Index = factory()
    }
}(this, function () {
    var config = null
    var directAccess = false
    var gapiUrl = 'https://apis.google.com/js/api:client.js'

    var gAuth = {
        install: function (Vue, options) {
            Vue.googleAuth = googleAuth
            Vue.prototype.$googleAuth = googleAuth

            if (typeof options === 'object') {
                config = Object.assign({ scope: 'profile email https://www.googleapis.com/auth/plus.login' }, options)
            }
        }
    }

    function googleAuth () {
        return {
            load: async function () {
                return new Promise(function (resolve) {
                    if (window.gapi === undefined) {
                        installClient().then(function () {
                            return initClient()
                        }).then(function () {
                            resolve()
                        })
                    } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
                        initClient().then(function () {
                            resolve()
                        })
                    }
                })
            },

            directAccess: function () {
                directAccess = true
            },

            signIn: function (successCallback, errorCallback) {
                if (directAccess) {
                    window.gapi.auth2.getAuthInstance().signIn().then(function (googleUser) {
                        successCallback(googleUser)
                    }, function (error) {
                        errorCallback(error)
                    })
                } else {
                     window.gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
                        successCallback(response.code)
                    }, function (error) {
                        errorCallback(error)
                    })
                }
            },

            getIsSignedIn: function (){
                let dfi = window.gapi.auth2.getAuthInstance().isSignedIn
                return dfi
            },

            getAuthInstance: function (){
                return window.gapi.auth2.getAuthInstance()
            },

            getCurrentUser: function () {
                return  window.gapi.auth2.getAuthInstance().currentUser.Mb.Au
            },

            signOut: function (successCallback, errorCallback) {
                window.gapi.auth2.getAuthInstance().signOut().then(function () {
                    successCallback()
                }, function (error) {
                    errorCallback(error)
                })
            }
        }
    }

    function installClient () {
        return new Promise(function (resolve) {
            var script = document.createElement('script')
            script.src = gapiUrl
            script.onreadystatechange = script.onload = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    setTimeout(function () {
                        resolve()
                    }, 500)
                }
            }
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    }

    function initClient () {
        return new Promise(function (resolve,reject) {
                window.gapi.load('auth2', async () => {
                    try {
                        setTimeout(function(){
                            window.gapi.client.init(config);
                        }, 2000)
                        resolve();
                    } catch (gapiErrorResponse) {
                        let errorMessage = gapiErrorResponse.error.message;
                        console.log(errorMessage)
                        reject({ error: errorMessage});
                    }
                })
        })
    }

    return gAuth
}))