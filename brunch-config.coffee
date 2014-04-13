exports.config =
  paths:
    public: 'public'

  files:
    javascripts:
      joinTo:
        'js/vendor.js': /^vendor\/scripts/
        'js/app.js': /^app(\/|\\)(?!assets)/

    stylesheets:
      joinTo:
        'ss/vendor.css': /^vendor\/styles/
        'ss/app.css': /^app\/styles/

  plugins:
    jshint:
      pattern: /^app\/.*\.js$/
