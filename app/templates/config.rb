require 'compass/import-once/activate'
require 'singularitygs'
require 'breakpoint'
require 'toolkit'

# Set this to the root of your project when deployed:
http_path = "./"
css_dir = "css"
sass_dir = "_sass"
images_dir = "img"
javascripts_dir = "js"
fonts_dir = "fonts"

# To enable relative paths to assets via compass helper functions.
relative_assets = true

# To enable debugging comments that display the original location of your selectors. Comment:
line_comments = false

# In development, we can turn on the debug_info to use with FireSass or Chrome Web Inspector. Uncomment:
# debug = true

##############################
## You probably don't need to edit anything below this.
##############################

# Disable cache busting on image assets
asset_cache_buster :none

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :development) ? :expanded : :compressed

# Pass options to sass. For development, we turn on the FireSass-compatible
# debug_info if the debug config variable above is true.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}
