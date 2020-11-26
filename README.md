# Tracking the National Government's Covid-19 Aid Spending

This is a dashboard built as a part of a coursework for MSc in Computational and Data Journalism at Cardiff University.

This analytical dashboard contains information on the Philippine national government’s spending on social and economic assistance to Filipinos during the covid-19 pandemic. The current version covers data from 17 March to 31 August 2020, but a few portions reflect data as of 4 November 2020. It is planned to be manually updated on a weekly basis or as data becomes available.

It was intended to support journalists covering the pandemic in the Philippines, but it may also be used by researchers, budget transparency advocates, and the public interested in aid data.


## Navigate this site

The dashboard has seven sections. The first section displays the total amount set aside by the national government to address the pandemic and that spent on aid. The subsequent sections break down the total aid allocation into six areas of analysis: 1) areas of focus, 2) disbursement timeline, 3) implementing agencies, 4) types of aid, 5) types of beneficiaries, and 6) location of beneficiaries. Each section contains labels and visual elements. Five visual elements feature user interactions, such as clickable elements and filtering options.

Data is presented in interactive graphs and made available for download.

## Data sources

Asian Development Bank's [Projects and Tenders in the Philippines](https://www.adb.org/projects/country/phi)  
Asian Infrastructure Investment Bank's [Projects](https://www.aiib.org/en/projects/list/index.html)  
Bangko Sentral ng Pilipinas's [Data on Daily, monthly (average and end- of-period) and annual Peso per US dollar](https://www.bsp.gov.ph/statistics/external/pesodollar.xls)  
Bayanihan to Heal as One Act 2020  
Department of Budget and Management's [Status of COVID-19 Releases](https://www.dbm.gov.ph/index.php/programs-projects/status-of-covid-19-releases)  
Department of Social Welfare and Development's [SAP monitoring dashboard for emergency subsidy under AICS-tables](https://public.tableau.com/profile/dswd.gis#!/vizhome/SAPMonitoringDashboardforEmergcencySubsidyunderAICS-Tables/Dashboard1)  
Disaster Response Operations Monitoring and Information Center's [Report on the Coronavirus Disease (COVID19) from March 26 to August 31, 2020](https://dromic.dswd.gov.ph/coronavirus-disease-covid-19-31-dec-2019/?fbclid=IwAR0Z5v9LYXCay_d-ydb-TD3pNBdi6Icd1bKRP0pU7AW_O97NMYSwYELNKpU)  
Japan International Cooperation Agency's [ODA Loan Projects](https://www2.jica.go.jp/en/yen_loan/index.php/module/search?anken_name=&area1=0&area2=0&area3=0&country1=73&country2=0&country3=0&section1=0&section2=0&section3=0&industry1=0&industry2=0&industry3=0&chotatsu_kubun=0&from_year=&to_year=&currency=jpy&submit=Search)  
Office of the President's [Reports to the Joint Congressional Oversight Committees](https://www.officialgazette.gov.ph/masterlist-generator/?category=other-issuances&president=rodrigo-roa-duterte&per_page=10&on_order=DESC)  
The World Bank's [Projects](https://projects.worldbank.org/en/projects-operations/projects-list?countrycode_exact=PH)  


## Data processing

Tabula was used for turning tables from PDF and Word documents into spreadsheets. Python was used to scrape documents from websites and to clean and combine various datasets. Microsoft Excel was used for performing simple cleaning and analysis of data.


## Technologies used

The following libraries were used: React v16.13.1 for building the user interface, React Helmet v6.1.0 for managing the document head section (Huffman 2019), Bootstrap v4.5.3 for creating the layout, Chart.js and chartjs-plugin-annotation.js v0.5.7 for the visualisations, react-papaparse v3.8.0 for parsing CSV files to JSON, react-bootstrap-table2 v4.0.3 (Fang 2020) for rendering Bootstrap tables in React components, React-Bootstrap for rendering Bootstrap tooltips in React components, and Font Awesome for the icons.


## Publication

This project was published in November 2020.
