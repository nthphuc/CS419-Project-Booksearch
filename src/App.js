import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiDataList,
  MultiList,
  RangeSlider,
  SelectedFilters,
  ResultCard,
  ReactiveList,
  SingleDropdownRange,
  RatingsFilter
} from "@appbaseio/reactivesearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import "./App.css";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      typeSearch : ["original_title", "authors"],
      hintText: "Search for a book by title or author"
    }
  }

  updateTest(value){
    var newTypeSearch = []
    var newHintText = ""
    if (value===null){
      newTypeSearch=["original_title", "authors"]
      newHintText="Search for a book by title or author"
    }
    else{
      if (value.label==="All"){
        newTypeSearch=["original_title", "authors"]
        newHintText="Search for a book title or author"
      }
      else{
        if (value.label==="Author"){
          newTypeSearch=["authors"]
          newHintText="Search for a book by author"
        }
        else{
          newTypeSearch=["original_title"]
          newHintText="Search for a book by title"
        }
      }
    }
    this.setState({
      typeSearch:newTypeSearch,
      hintText:newHintText
    })
  }

  render() {
    return (
      <ReactiveBase
        app="booksearchdata"
        credentials="ovVAjyu75:1a5db27b-df1b-4795-bf38-e3bdabbe5a92">
        <div className="navbar">
          <div className="logo">The Booksearch App</div>

          <SingleDropdownRange
            className="typesearch"
            componentId=""
            data={[{label:"All"}, {label:"Title"}, {label:"Author"}]}
            defaultValue="All"
            onValueChange={this.updateTest.bind(this)}
          />

          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={this.state.typeSearch}
            queryFormat="and"
            placeholder={this.state.hintText}
            innerClass={{
              input: "searchbox",
              list: "suggestionlist"
            }}
            autosuggest={true}
            iconPosition="left"
            filterLabel="search"
          />
        </div>

        <div className={"display"}>
          <div className={"leftSidebar"}>
            <RatingsFilter
              componentId="ratingsFilter"
              dataField="average_rating"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "4 & up" },
                { start: 3, end: 5, label: "3 & up" },
                { start: 2, end: 5, label: "2 & up" },
                { start: 1, end: 5, label: "1 & up" }
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            />

            <RangeSlider
              componentId="publishFilter"
              dataField="original_publication_year"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: 1920,
                end: 2020
              }}
              rangeLabels={{
                start: "1920",
                end: "2020"
              }}
              interval={2}
            />

            <MultiDataList
              componentId="languageFilter"
              dataField="language_code.keyword"
              className="languageFilter"
              size={100}
              sortBy="asc"
              queryFormat="or"
              showCheckbox={true}
              showSearch={true}
              placeholder="Search for a language"
              react={{
                and: [
                  "mainSearch",
                  "results",
                  "RangeSlider",
                  "revenue-list"
                ]
              }}
              data={[
                {
                  label: "Vietnamese",
                  value: "vie",
                },
                {
                  label: "Arabic",
                  value: "ara",
                },
                {
                  label: "English",
                  value: "eng"
                },
                {
                  label: "English (United States)",
                  value: "en-US"
                },
                {
                  label: "English (United Kingdom)",
                  value: "en-GB"
                },
                {
                  label: "English (Canada)",
                  value: "en-CA"
                },
                {
                  label: "French",
                  value: "fre"
                },
                {
                  label: "Indonesian",
                  value: "ind"
                },
                {
                  label: "Spanish",
                  value: "spa"
                },
                {
                  label: "German",
                  value: "ger"
                },
                {
                  label: "Japanese",
                  value: "jpn"
                },
                {
                  label: "Persian",
                  value: "per"
                },
                {
                  label: "Polish",
                  value: "pol"
                },
                {
                  label: "Portuguese",
                  value: "por"
                },
                {
                  label: "Danish",
                  value: "dan"
                },
                {
                  label: "Norwegian",
                  value: "nor"
                },
                {
                  label: "Filipino",
                  value: "fil"
                },
                {
                  label: "Italian",
                  value: "ita"
                },
                {
                  label: "Multiple languages",
                  value: "mul"
                },
                {
                  label: "Dutch",
                  value: "nl"
                },
                {
                  label: "Romanian",
                  value: "rum"
                },
                {
                  label: "Russian",
                  value: "rus"
                },
                {
                  label: "Swedish",
                  value: "swe"
                },
                {
                  label: "Turkish",
                  value: "tur"
                },
                {
                  label: "Undefined",
                  value: ""
                }
              ]}
              showFilter={true}
              filterLabel="Language"
              URLParams={false}
              innerClass={{
                label: "list-item",
                input: "list-input"
            }}
          />
          </div>

          <div className={"mainBar"}>
            <SelectedFilters />

            <ReactiveList
              componentId="SearchResult"
              dataField="original_title"
              size={8}
              pagination
              react={{
                and: [
                  "mainSearch",
                  "ratingsFilter",
                  "publishFilter",
                  "authorFilter",
                  "languageFilter"
                ]
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {data.map(item => (
                    <ResultCard key={item.id}>

                      <ResultCard.Image src={item.image_url} />

                      <ResultCard.Title>
                        <div
                          className="book-title"
                          dangerouslySetInnerHTML={{
                            __html: item.original_title
                          }}
                        />
                      </ResultCard.Title>

                      <ResultCard.Description>
                        <div className="flex column justify-space-between">
                          <div>
                            <div>
                              by{" "}
                              <span className="authors-list">
                                {item.authors}
                              </span>
                            </div>
                            <div className="ratings-list flex align-center">
                              <span className="stars">
                                {Array(item.average_rating|0)
                                  .fill("x")
                                  .map((
                                    item, // eslint-disable-line
                                    index
                                  ) => (
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="yellow"
                                      key={index} // eslint-disable-line
                                    />
                                  ))}
                              </span>
                              <span className="avg-rating">
                                ({item.average_rating} avg)
                              </span>
                            </div>
                          </div>
                          <span className="pub-year">
                            Pub {item.original_publication_year|0}
                          </span>
                        </div>
                      </ResultCard.Description>

                    </ResultCard>
                  ))}
                </ReactiveList.ResultCardsWrapper>
              )}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;