BIN = node_modules/.bin
DIST = dist
SRC = src

CSS_INPUT = $(SRC)/styles/main.scss
CSS_OUTPUT = $(DIST)/style.css

JS_INPUT = $(SRC)/scripts/app.js
JS_OUTPUT = $(DIST)/app

all: clean js css post_build

clean:
	@rm -rf $(DIST)
	@mkdir $(DIST)

watch:
	@make watchSASS & make watchJS

watchSASS:
	@$(BIN)/watch "make css" $(SRC)/styles --wait=.1

watchJS:
	@$(BIN)/watchify --verbose -t babelify -o $(JS_OUTPUT).js $(JS_INPUT) -d

js:
	@echo Building scripts...
	@$(BIN)/browserify $(JS_INPUT) -t babelify --outfile $(JS_OUTPUT).js
	@echo Finished scripts. `date`

css:
	@echo Building styles...
	@sass --scss --update $(CSS_INPUT):$(CSS_OUTPUT)
	@$(BIN)/postcss --use autoprefixer $(CSS_OUTPUT) -d $(DIST)
	@echo Finished styles. `date`

post_build:
	@echo Finished build. `date`
	@echo '====='

min.js:
	$(BIN)/uglifyjs $(JS_OUTPUT).js -o $(JS_OUTPUT).min.js --source-map $(JS_OUTPUT).min.js.map

release: min.js