import React from 'react'
import { Section } from 'neal-react'

export default class extends React.Component {
  render () {
    return (
      <Section>
        <h2>Historical society newsletters</h2>
        <ul>
          <li><a href="pdf/herron.pdf">Herron Murder in Idaville</a></li>
          <br />
          <li><a href="pdf/CHTOldMills.pdf">Pulaski/White Early Mills</a></li>
          </ul>
      </Section>
    )
  }
}
