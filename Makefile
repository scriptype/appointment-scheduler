BIN = node_modules/.bin
DIST = dist
SRC = src

CSS_INPUT = $(SRC)/styles/main.scss
CSS_OUTPUT = $(DIST)/style

JS_INPUT = $(SRC)/scripts/app.js
JS_OUTPUT = $(DIST)/app

all: clean copy_static html css js

release: copy_static min.html min.css min.js

clean:
	@rm -rf $(DIST)
	@mkdir $(DIST)

watch: clean copy_static html
	@make watchSASS & make watchJS

watchSASS:
	@$(BIN)/watch "make css" $(SRC)/styles --wait=.1

watchJS:
	@$(BIN)/watchify --delay=100 --verbose -t babelify $(JS_INPUT) -o $(JS_OUTPUT).js -d

html:
	@echo "Creating markup..."
	@make interpolate_html SCRIPT_FILE=app.js STYLE_FILE=style.css
	@make finish_message type=markup

interpolate_html:
	@cp $(SRC)/index.html $(DIST)
	@$(BIN)/handlebars $(SRC)/index.html -f $(DIST)/__index-hbs.js
	@node -e "\
	var Handlebars = require('handlebars');\
	var template = require('./$(DIST)/__index-hbs');\
	process.stdout.write(\
	  Handlebars.templates['index.html']({\
	    SCRIPT_FILE: '$(SCRIPT_FILE)',\
	    STYLE_FILE: '$(STYLE_FILE)'\
	  })\
	)\
	" > $(DIST)/index.html
	@rm $(DIST)/__index-hbs.js

js:
	@echo Building scripts...
	@$(BIN)/browserify $(JS_INPUT) -t babelify --outfile $(JS_OUTPUT).js
	@make finish_message type=scripts

css:
	@echo Building styles...
	@sass --scss --update $(CSS_INPUT):$(CSS_OUTPUT).css
	@$(BIN)/postcss --use autoprefixer $(CSS_OUTPUT).css -d $(DIST)
	@make finish_message type=styles

min.js:
	@echo Minifying scripts...
	@$(BIN)/uglifyjs $(JS_OUTPUT).js -o $(JS_OUTPUT).min.js
	@make finish_message type='minifying scripts'

min.css:
	@echo Minifying styles...
	@sass --scss --update --style compressed $(CSS_OUTPUT).css:$(CSS_OUTPUT).min.css
	@make finish_message type='minifying styles'

min.html:
	@echo Updating markup...
	@make interpolate_html SCRIPT_FILE=app.min.js STYLE_FILE=style.min.css
	@make finish_message type=markup

copy_static:
	@echo Copying static files...
	@mkdir -p $(DIST)/fonts
	@mkdir -p $(DIST)/images
	@cp -r $(SRC)/fonts/ $(DIST)/fonts
	@cp -r $(SRC)/images/ $(DIST)/images
	@make finish_message type='copying static files'

finish_message:
	@echo Finished $(type). `date`
	@echo '====='