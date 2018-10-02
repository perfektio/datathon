import React, { Component } from 'react';
import Card from '../../KOMPONENTIT/Card'

const sources = [
  {
    type: 'Document',
    name: 'Commission notice - Guidance on Innovation Procurement',
    link: 'https://ec.europa.eu/docsroom/documents/29261'
  },
  {
    type: 'Link',
    name: 'Why buy innovation? ',
    link: 'https://www.innovation-procurement.org/about-ppi/guidance/'
  },
  {
    type: 'Link',
    name: 'Procurement of innovation platform',
    link: 'https://www.innovation-procurement.org/about-ppi/'
  },
  {
    type: 'Link',
    name: 'Innovation Procurement - European Commision ',
    link: 'https://ec.europa.eu/digital-single-market/en/innovation-procurement'
  },
]

const companies = [
  {
    name: 'Industryhack',
    link: 'https://industryhack.com/'
  },
  {
    name: 'Junction',
    link: 'https://hackjunction.com/'
  },
  {
    name: 'BEMYAPP',
    link: 'http://www.bemyapp.com/'
  },
  {
    name: 'HackPartners',
    link: 'https://hackpartners.com/'
  },
  {
    name: 'Industrial Hackathon',
    link: 'http://www.industrialhackathon.fi/index.php/fi/'
  },
]

class Resources extends Component {


  renderSources() {
    return (
      sources.map((source, key) =>
        <Card key={key} type={source.type} name={source.name} link={source.link} />
      )
    )
  }

  renderCompanies() {
    return (
      companies.map((company, key) =>
        <div className="box company-item">
          <a className="" key={key} href={company.link}>
            {company.name}
          </a>
        </div>
      )
    )
  }

  render() {
    return (
      <div className="i-resources">
        <div className="container i-bordered is-fluid">
          <div className="columns ">
            <div className="column ">
              <div className="title is-2">Innovation procurement resources</div>
              <div className="subtitle is-4">This page is collects relevant links concerning innovation procurement</div>
            </div>
          </div>

          <div className="columns spacer-big">
            <div className="column ">
              <div className="title is-3">Information concerning innovation procurement</div>
              <div className="subtitle is-4">This page is collects relevant links concerning innovation procurement</div>
            </div>
          </div>
          <div className="spacer-small columns">
            {this.renderSources()}
          </div>

          <div className="columns spacer-big">
            <div className="column ">
              <div className="title is-3">Companies and organizations working in open innovation sector</div>
              <div className="subtitle is-4">Companies and organizations working in open innovation sector</div>
            </div>
          </div>
          <div className="company-container">
            {this.renderCompanies()}
          </div>

        </div>
      </div>
    );
  }
}

export default Resources;
