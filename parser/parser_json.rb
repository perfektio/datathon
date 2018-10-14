require 'yajl'
require 'json'


# procedureType: INOVATION_PARTNERSHIP

filename = 'data-all-2017.json'


json = File.new(filename, 'r')
parser = Yajl::Parser.new
hash = parser.parse(json)

hash.each do |k, v|
  json = JSON.parse(string)
  procedure = v["procedureType"]

  if procedure == "INOVATION_PARTNERSHIP"
    puts json
  end
end
