require 'csv'
require 'json'

files = [
  'data-all-2009.csv',
  'data-all-2010.csv',
  'data-all-2011.csv',
  'data-all-2012.csv',
  'data-all-2013.csv',
  'data-all-2014.csv',
  'data-all-2015.csv',
  'data-all-2016.csv',
  'data-all-2017.csv',
  'data-all-2018.csv',
  'data-all-year-unavailable.csv'
]

def create_title_map(row)
  row.each_with_index do |title, index|
    @title_to_index[title] = index
    @index_to_title[index] = title
  end
end

def create_hash(row)
  hash = {}
  row.each_with_index do |line, index|
    hash[ @index_to_title[index] ] = line
  end

  puts hash["tender_id"]

  hash
end



# procedureType: INOVATION_PARTNERSHIP

@innovations = []
@title_to_index = {}
@index_to_title = {}

i = 0
innovation_count = 0

# filename = 'csv/data-all-2017.csv'
files.each do |filename|
  puts filename
  i = 0

  File.foreach("csv/#{filename}") do |line|
    begin
      CSV.parse(line, col_sep: ";") do |row|
        if i == 0
          create_title_map(row)
          next
        end

        procedure = row[ @title_to_index["tender_procedureType"] ]

        if procedure == "INOVATION_PARTNERSHIP"
          @innovations << create_hash(row)
          innovation_count += 1
          puts "#{innovation_count} innovation partnerships"
        end
      end
    rescue CSV::MalformedCSVError => error
    end

    puts i if i % 2000 == 0

    i += 1
  end
end




File.open("./all.json","w") do |f|
  f.write(@innovations.to_json)
end
