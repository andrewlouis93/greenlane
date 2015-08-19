var React = require('react/addons');
var config = require('../config.js');
var Classnames = require('classnames');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');


var RouteComponent = React.createClass({
  render: function() {
    return (
      <svg version="1.1" id="routeSmall" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width='100%' height="100%"
         viewBox="0 -10 302.9 337.2">
      <g>
        <g>
          <path className="st29" d="M91.6,79.9h15.6c0.5,0,0.8,0.4,0.8,0.8v1.5c0,0.5-0.4,0.8-0.8,0.8H91.6c-0.5,0-0.8-0.4-0.8-0.8v-1.5
            C90.8,80.3,91.2,79.9,91.6,79.9z"/>
        </g>
        <g>
          <ellipse className="st29" cx="91.5" cy="81.5" rx="6.1" ry="1.6"/>
        </g>
        <g>
          <g>
            <path className="st29" d="M178.6,180.5h15.6c0.5,0,0.8,0.4,0.8,0.8v1.5c0,0.5-0.4,0.8-0.8,0.8h-15.6c-0.5,0-0.8-0.4-0.8-0.8v-1.5
              C177.8,180.9,178.1,180.5,178.6,180.5z"/>
          </g>
          <g>
            <ellipse className="st29" cx="178.5" cy="182.1" rx="6.1" ry="1.6"/>
          </g>
        </g>
        <g>
          <g>
            <path className="st29" d="M214.4,180.5H230c0.5,0,0.8,0.4,0.8,0.8v1.5c0,0.5-0.4,0.8-0.8,0.8h-15.6c-0.5,0-0.8-0.4-0.8-0.8v-1.5
              C213.5,180.9,213.9,180.5,214.4,180.5z"/>
          </g>
          <g>
            <ellipse className="st29" cx="214.3" cy="182.1" rx="6.1" ry="1.6"/>
          </g>
        </g>
        <g>
          <path className="st29" d="M55.9,79.9h15.6c0.5,0,0.8,0.4,0.8,0.8v1.5c0,0.5-0.4,0.8-0.8,0.8H55.9c-0.5,0-0.8-0.4-0.8-0.8v-1.5
            C55.1,80.3,55.4,79.9,55.9,79.9z"/>
        </g>
        <g>
          <rect x="191.4" y="130.1" className="st13" width="3.7" height="53.7"/>
        </g>
        <g>
          <path className="st4" d="M193.5,163.7c0,0-14.3,0.1-14.3-17.2c0-14.1,14.3-45.8,14.3-45.8s14.3,31.7,14.3,45.8
            C207.8,163.8,193.5,163.7,193.5,163.7z"/>
        </g>
        <g>
          <path className="st14" d="M193.5,100.7v63c0,0,14.3,0.1,14.3-17.2C207.8,132.4,193.5,100.7,193.5,100.7z"/>
        </g>
        <g>
          <rect x="227.1" y="130.1" className="st13" width="3.7" height="53.7"/>
        </g>
        <g>
          <path className="st4" d="M229.2,163.7c0,0-14.3,0.1-14.3-17.2c0-14.1,14.3-45.8,14.3-45.8s14.3,31.7,14.3,45.8
            C243.5,163.8,229.2,163.7,229.2,163.7z"/>
        </g>
        <g>
          <path className="st14" d="M229.2,100.7v63c0,0,14.3,0.1,14.3-17.2C243.5,132.4,229.2,100.7,229.2,100.7z"/>
        </g>
        <g>
          <rect x="68.7" y="29.4" className="st13" width="3.7" height="53.7"/>
        </g>
        <g>
          <path className="st4" d="M70.7,63c0,0-14.3,0.1-14.3-17.2C56.4,31.7,70.7,0,70.7,0s14.3,31.7,14.3,45.8C85.1,63.2,70.7,63,70.7,63z"/>
        </g>
        <g>
          <path className="st14" d="M70.7,0v63c0,0,14.3,0.1,14.3-17.2C85.1,31.7,70.7,0,70.7,0z"/>
        </g>
        <g>
          <rect x="104.4" y="29.4" className="st13" width="3.7" height="53.7"/>
        </g>
        <g>
          <path className="st4" d="M106.4,63c0,0-14.3,0.1-14.3-17.2C92.1,31.7,106.4,0,106.4,0s14.3,31.7,14.3,45.8
            C120.8,63.2,106.4,63,106.4,63z"/>
        </g>
        <g>
          <path className="st14" d="M106.4,0v63c0,0,14.3,0.1,14.3-17.2C120.8,31.7,106.4,0,106.4,0z"/>
        </g>
        <g id="locIconStart">
          <g>
            <path className="st5" d="M300,129.7c0,12.6-22.8,44.2-22.8,44.2s-22.8-31.6-22.8-44.2s10.2-22.8,22.8-22.8
              C289.8,106.9,300,117.1,300,129.7z"/>
          </g>
          <g><circle className="st1" cx="277.2" cy="130.7" r="11.5"/></g>
        </g>
        <g id="locIconEnd">
          <g>
            <path className="st5" d="M45.6,27.7c0,12.6-22.8,44.2-22.8,44.2S0,40.3,0,27.7S10.2,4.9,22.8,4.9S45.6,15.1,45.6,27.7z"/>
          </g>
          <g>
            <circle className="st1" cx="22.8" cy="28.7" r="11.5"/>
          </g>
        </g>
        <g>
          <g>
            <g>
              <g>
                <path className="st30" d="M134.1,171.9h-16c-5.6,0-10.1-4.5-10.1-10.1s4.5-10.1,10.1-10.1h16c4.2,0,14.1,0,14.1-16.5
                  c0-4.3-1.1-8.5-2.9-11.3c-1.4-2.2-4.1-5.1-11.2-5.1H22.8c-5.6,0-10.1-4.5-10.1-10.1c0-0.7,0-3.5,0-3.5s4.6-6.6,10.1-6.6h111.3
                  c23.6,0,34.3,33.5,34.3,33.5s0,3,0,3.1C168.4,157.8,155.2,171.9,134.1,171.9z"/>
              </g>
            </g>
            <g>
              <g>
                <path className="st30" d="M279,220.4H104.1c-23.7,0-34.3-18.1-34.3-36.1c0-0.5,0-3.9,0-3.9s10.9-28.7,34.3-28.7h12.1
                  c5.6,0,10.1,4.5,10.1,10.1s-4.5,10.1-10.1,10.1h-12.1c-4.3,0-14.1,1.2-14.1,12.4c0,4.2,1.1,8.3,2.9,11c1.4,2.1,4.1,5,11.3,5
                  H279c5.5,0,10.1,6.3,10.1,6.3s0,3.4,0,3.8C289.1,215.9,284.6,220.4,279,220.4z"/>
              </g>
            </g>
          </g>
          <g>
            <g>
              <path className="st4" d="M134.1,167.9h-16c-5.6,0-10.1-4.5-10.1-10.1s4.5-10.1,10.1-10.1h16c4.2,0,14.1,0,14.1-16.5
                c0-4.3-1.1-8.5-2.9-11.3c-1.4-2.2-4.1-5.1-11.2-5.1H22.8c-5.6,0-10.1-4.5-10.1-10.1s4.5-10.1,10.1-10.1h111.3
                c23.7,0,34.3,18.4,34.3,36.6C168.4,153.8,155.2,167.9,134.1,167.9z"/>
            </g>
            <g>
              <path className="st4" d="M279,216.4H104.1c-23.7,0-34.3-18.1-34.3-36.1c0-15.7,10.7-32.6,34.3-32.6h12.1c5.6,0,10.1,4.5,10.1,10.1
                s-4.5,10.1-10.1,10.1h-12.1c-4.3,0-14.1,1.2-14.1,12.4c0,4.2,1.1,8.3,2.9,11c1.4,2.1,4.1,4.9,11.3,4.9H279
                c5.6,0,10.1,4.5,10.1,10.1S284.6,216.4,279,216.4z"/>
            </g>
          </g>
        </g>
        <g>
          <g>
            <path className="st31" d="M28.3,273.1H25l-0.5-2.3c-0.3-0.3-0.8-0.5-1.3-0.7c-0.5-0.2-1.1-0.3-1.7-0.3c-0.9,0-1.6,0.2-2.1,0.6
              c-0.5,0.4-0.8,0.9-0.8,1.5c0,0.6,0.2,1,0.7,1.4c0.5,0.4,1.5,0.7,2.9,1c2.3,0.5,4,1.1,5.1,2c1.1,0.9,1.7,2.1,1.7,3.6
              c0,1.7-0.7,3-2.1,4.1c-1.4,1.1-3.3,1.6-5.6,1.6c-1.4,0-2.7-0.2-3.9-0.6c-1.2-0.4-2.2-1-3.2-1.8l-0.1-4.2h3.5l0.7,2.4
              c0.3,0.2,0.7,0.4,1.2,0.6c0.5,0.1,1,0.2,1.6,0.2c1,0,1.8-0.2,2.3-0.5c0.5-0.4,0.8-0.9,0.8-1.5c0-0.5-0.3-1-0.8-1.4
              c-0.5-0.4-1.5-0.8-3-1.1c-2.2-0.4-3.8-1.1-4.9-2c-1.1-0.9-1.7-2.1-1.7-3.6c0-1.5,0.6-2.9,1.9-4c1.3-1.1,3.1-1.7,5.5-1.7
              c1.4,0,2.8,0.2,4.1,0.6c1.3,0.4,2.3,0.9,3,1.5L28.3,273.1z"/>
          </g>
          <g>
            <path className="st31" d="M31.2,275.8c0-2.8,0.8-5,2.3-6.8c1.5-1.8,3.7-2.6,6.4-2.6c2.7,0,4.9,0.9,6.4,2.6c1.5,1.8,2.3,4,2.3,6.8v0.4
              c0,2.8-0.8,5-2.3,6.8c-1.5,1.7-3.7,2.6-6.4,2.6c-2.7,0-4.9-0.9-6.4-2.6s-2.3-4-2.3-6.8V275.8z M36.2,276.1c0,1.7,0.3,3,0.9,4.1
              c0.6,1,1.6,1.5,2.9,1.5c1.3,0,2.2-0.5,2.8-1.5c0.6-1,0.9-2.4,0.9-4v-0.4c0-1.6-0.3-3-0.9-4s-1.6-1.6-2.9-1.6s-2.2,0.5-2.8,1.6
              c-0.6,1-0.9,2.4-0.9,4V276.1z"/>
          </g>
          <g>
            <path className="st31" d="M50.3,269.7v-3h7.3l0.2,2.4c0.6-0.9,1.3-1.6,2.2-2.1s1.9-0.7,3.1-0.7c1.2,0,2.2,0.3,3,0.8
              c0.8,0.5,1.5,1.3,1.9,2.4c0.6-1,1.3-1.8,2.2-2.3c0.9-0.6,2-0.8,3.2-0.8c1.8,0,3.3,0.6,4.3,1.9c1.1,1.3,1.6,3.2,1.6,5.8v7.7
              l2.4,0.5v3h-9.6v-3l2.2-0.5V274c0-1.4-0.2-2.4-0.7-2.9s-1.1-0.8-2-0.8c-0.7,0-1.3,0.2-1.8,0.5c-0.5,0.3-0.9,0.7-1.2,1.3
              c0,0.2,0,0.4,0,0.6c0,0.2,0,0.3,0,0.5v8.6l2,0.5v3h-9v-3l2-0.5V274c0-1.4-0.2-2.3-0.7-2.9s-1.1-0.8-2.1-0.8
              c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.3-0.9,0.6-1.3,1.1v10l2.2,0.5v3h-9.5v-3l2.4-0.5v-11.5L50.3,269.7z"/>
          </g>
          <g>
            <path className="st31" d="M92.1,285.6c-2.7,0-4.8-0.9-6.4-2.6c-1.6-1.7-2.4-3.9-2.4-6.5v-0.7c0-2.7,0.8-5,2.3-6.8s3.5-2.7,6.1-2.6
              c2.5,0,4.4,0.8,5.8,2.3c1.4,1.5,2.1,3.5,2.1,6.1v2.7h-11l0,0.1c0.1,1.2,0.5,2.2,1.2,3c0.7,0.8,1.7,1.2,2.9,1.2
              c1.1,0,2-0.1,2.8-0.3c0.7-0.2,1.5-0.6,2.4-1.1l1.3,3.1c-0.8,0.6-1.8,1.1-3,1.5S93.6,285.6,92.1,285.6z M91.6,270.2
              c-0.9,0-1.7,0.4-2.2,1.1c-0.5,0.7-0.9,1.6-1,2.8l0.1,0.1h6.1v-0.4c0-1.1-0.2-1.9-0.7-2.5S92.6,270.2,91.6,270.2z"/>
          </g>
          <g>
            <path className="st31" d="M128.2,269.7l-1.9,0.2l-3.9,15.2h-4.2l-3.4-11h-0.1l-3.4,11h-4.2l-3.9-15.2l-1.9-0.2v-3h8.4v3l-2,0.4
              l1.7,8.5h0.1l3.5-11.8h3.3l3.5,11.9h0.1l1.7-8.5l-2-0.4v-3h8.4V269.7z"/>
          </g>
          <g>
            <path className="st31" d="M129.7,282.2l2.4-0.5v-19.6l-2.7-0.5v-3h7.6v10.5c0.6-0.9,1.3-1.5,2.1-2c0.8-0.5,1.8-0.7,2.8-0.7
              c1.9,0,3.5,0.6,4.6,1.9c1.1,1.3,1.6,3.3,1.6,5.9v7.5l2.4,0.5v3H141v-3l2.2-0.5v-7.5c0-1.4-0.3-2.5-0.8-3.1
              c-0.5-0.6-1.3-0.9-2.3-0.9c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.3-1,0.6-1.3,1.1v10l2.2,0.5v3h-9.5V282.2z"/>
          </g>
          <g>
            <path className="st31" d="M160.9,285.6c-2.7,0-4.8-0.9-6.4-2.6s-2.4-3.9-2.4-6.5v-0.7c0-2.7,0.8-5,2.3-6.8s3.5-2.7,6.1-2.6
              c2.5,0,4.4,0.8,5.8,2.3s2.1,3.5,2.1,6.1v2.7h-11l0,0.1c0.1,1.2,0.5,2.2,1.2,3c0.7,0.8,1.7,1.2,2.9,1.2c1.1,0,2-0.1,2.8-0.3
              c0.7-0.2,1.5-0.6,2.4-1.1l1.3,3.1c-0.8,0.6-1.8,1.1-3,1.5C163.7,285.4,162.4,285.6,160.9,285.6z M160.4,270.2
              c-0.9,0-1.7,0.4-2.2,1.1c-0.5,0.7-0.9,1.6-1,2.8l0.1,0.1h6.1v-0.4c0-1.1-0.2-1.9-0.7-2.5C162.2,270.5,161.4,270.2,160.4,270.2z"
              />
          </g>
          <g>
            <path className="st31" d="M171,282.2l2.4-0.5v-11.5l-2.7-0.5v-3h7.3l0.2,2.7c0.4-1,1-1.7,1.7-2.2s1.5-0.8,2.4-0.8
              c0.3,0,0.5,0,0.8,0.1c0.3,0,0.5,0.1,0.7,0.1l-0.5,4.5l-2.1-0.1c-0.7,0-1.3,0.1-1.8,0.4s-0.8,0.7-1.1,1.2v9l2.4,0.5v3H171V282.2z"
              />
          </g>
          <g>
            <path className="st31" d="M193.9,285.6c-2.7,0-4.8-0.9-6.4-2.6s-2.4-3.9-2.4-6.5v-0.7c0-2.7,0.8-5,2.3-6.8s3.5-2.7,6.1-2.6
              c2.5,0,4.4,0.8,5.8,2.3s2.1,3.5,2.1,6.1v2.7h-11l0,0.1c0.1,1.2,0.5,2.2,1.2,3c0.7,0.8,1.7,1.2,2.9,1.2c1.1,0,2-0.1,2.8-0.3
              c0.7-0.2,1.5-0.6,2.4-1.1l1.3,3.1c-0.8,0.6-1.8,1.1-3,1.5C196.8,285.4,195.4,285.6,193.9,285.6z M193.5,270.2
              c-0.9,0-1.7,0.4-2.2,1.1c-0.5,0.7-0.9,1.6-1,2.8l0.1,0.1h6.1v-0.4c0-1.1-0.2-1.9-0.7-2.5C195.2,270.5,194.5,270.2,193.5,270.2z"
              />
          </g>
          <g>
            <path className="st31" d="M219.7,262.2v4.5h3.2v3.5h-3.2v9.4c0,0.7,0.1,1.2,0.4,1.5c0.3,0.3,0.7,0.5,1.2,0.5c0.3,0,0.6,0,0.9,0
              c0.3,0,0.5-0.1,0.9-0.1l0.4,3.6c-0.6,0.2-1.1,0.3-1.7,0.4c-0.5,0.1-1.1,0.1-1.8,0.1c-1.7,0-3-0.5-4-1.4s-1.4-2.4-1.4-4.5v-9.4
              H212v-3.5h2.7v-4.5H219.7z"/>
          </g>
          <g>
            <path className="st31" d="M224.8,275.8c0-2.8,0.8-5,2.3-6.8c1.5-1.8,3.7-2.6,6.4-2.6c2.7,0,4.9,0.9,6.4,2.6c1.5,1.8,2.3,4,2.3,6.8
              v0.4c0,2.8-0.8,5-2.3,6.8s-3.7,2.6-6.4,2.6c-2.7,0-4.9-0.9-6.4-2.6c-1.5-1.7-2.3-4-2.3-6.8V275.8z M229.8,276.1
              c0,1.7,0.3,3,0.9,4.1s1.5,1.5,2.9,1.5c1.3,0,2.2-0.5,2.8-1.5s0.9-2.4,0.9-4v-0.4c0-1.6-0.3-3-0.9-4c-0.6-1-1.6-1.6-2.9-1.6
              s-2.2,0.5-2.8,1.6s-0.9,2.4-0.9,4V276.1z"/>
          </g>
          <g>
            <path className="st31" d="M270.9,276.5c0,2.8-0.6,5-1.8,6.6c-1.2,1.7-3,2.5-5.3,2.5c-1.1,0-2-0.2-2.8-0.7c-0.8-0.4-1.5-1.1-2-2
              l-0.4,2.3h-4.3v-23.1l-2.7-0.5v-3h7.6v10.1c0.5-0.7,1.2-1.3,1.9-1.7s1.6-0.6,2.6-0.6c2.3,0,4.1,0.9,5.4,2.7
              c1.2,1.8,1.8,4.1,1.8,7.1V276.5z M265.9,276.1c0-1.8-0.3-3.2-0.8-4.3c-0.5-1.1-1.4-1.6-2.7-1.6c-0.8,0-1.4,0.2-2,0.5
              c-0.5,0.3-1,0.8-1.3,1.4v7.8c0.3,0.6,0.7,1,1.3,1.3c0.5,0.3,1.2,0.4,2,0.4c1.3,0,2.2-0.5,2.7-1.4c0.5-0.9,0.8-2.2,0.8-3.9V276.1z
              "/>
          </g>
          <g>
            <path className="st31" d="M282.1,285.6c-2.7,0-4.8-0.9-6.4-2.6s-2.4-3.9-2.4-6.5v-0.7c0-2.7,0.8-5,2.3-6.8s3.5-2.7,6.1-2.6
              c2.5,0,4.4,0.8,5.8,2.3s2.1,3.5,2.1,6.1v2.7h-11l0,0.1c0.1,1.2,0.5,2.2,1.2,3c0.7,0.8,1.7,1.2,2.9,1.2c1.1,0,2-0.1,2.8-0.3
              c0.7-0.2,1.5-0.6,2.4-1.1l1.3,3.1c-0.8,0.6-1.8,1.1-3,1.5C284.9,285.4,283.6,285.6,282.1,285.6z M281.6,270.2
              c-0.9,0-1.7,0.4-2.2,1.1c-0.5,0.7-0.9,1.6-1,2.8l0.1,0.1h6.1v-0.4c0-1.1-0.2-1.9-0.7-2.5C283.4,270.5,282.6,270.2,281.6,270.2z"
              />
          </g>
          <g>
            <path className="st31" d="M102.6,317.2v-11.5h-2.1V304h2.1v-1.4c0-1.4,0.4-2.5,1.1-3.3c0.8-0.8,1.8-1.2,3.2-1.2c0.5,0,1,0.1,1.6,0.2
              l-0.1,1.8c-0.4-0.1-0.8-0.1-1.2-0.1c-0.7,0-1.3,0.2-1.7,0.6c-0.4,0.4-0.6,1-0.6,1.8v1.4h2.8v1.7h-2.8v11.5H102.6z"/>
          </g>
          <g>
            <path className="st31" d="M116.6,306c-0.3-0.1-0.7-0.1-1.1-0.1c-1.5,0-2.5,0.6-3,1.9v9.4h-2.3V304h2.2l0,1.5c0.7-1.2,1.8-1.8,3.1-1.8
              c0.4,0,0.8,0.1,1,0.2V306z"/>
          </g>
          <g>
            <path className="st31" d="M117.8,310.5c0-1.3,0.3-2.5,0.8-3.5s1.2-1.8,2.1-2.4c0.9-0.6,1.9-0.8,3.1-0.8c1.8,0,3.3,0.6,4.4,1.9
              c1.1,1.2,1.7,2.9,1.7,5v0.2c0,1.3-0.2,2.4-0.7,3.5c-0.5,1-1.2,1.8-2.1,2.4c-0.9,0.6-2,0.9-3.2,0.9c-1.8,0-3.2-0.6-4.4-1.9
              c-1.1-1.2-1.7-2.9-1.7-4.9V310.5z M120.1,310.7c0,1.5,0.3,2.6,1,3.5s1.6,1.3,2.7,1.3c1.1,0,2.1-0.4,2.7-1.3s1-2.2,1-3.8
              c0-1.4-0.3-2.6-1-3.5c-0.7-0.9-1.6-1.3-2.7-1.3c-1.1,0-2,0.4-2.7,1.3S120.1,309.1,120.1,310.7z"/>
          </g>
          <g>
            <path className="st31" d="M134.8,304l0.1,1.5c1-1.1,2.3-1.7,3.9-1.7c1.8,0,3.1,0.7,3.8,2.1c0.4-0.6,1-1.1,1.7-1.5s1.5-0.6,2.5-0.6
              c2.9,0,4.4,1.5,4.4,4.6v8.8h-2.3v-8.7c0-0.9-0.2-1.7-0.6-2.1c-0.4-0.5-1.2-0.7-2.2-0.7c-0.8,0-1.5,0.2-2.1,0.8
              c-0.6,0.5-0.9,1.2-1,2v8.8h-2.3v-8.7c0-1.9-0.9-2.9-2.8-2.9c-1.5,0-2.5,0.6-3,1.9v9.6h-2.3V304H134.8z"/>
          </g>
          <g>
            <path className="st31" d="M168.9,317.2c-0.1-0.3-0.2-0.7-0.3-1.4c-1,1.1-2.3,1.6-3.8,1.6c-1.3,0-2.4-0.4-3.2-1.1
              c-0.8-0.7-1.3-1.7-1.3-2.8c0-1.4,0.5-2.4,1.6-3.2c1-0.8,2.5-1.1,4.4-1.1h2.2v-1c0-0.8-0.2-1.4-0.7-1.9c-0.5-0.5-1.2-0.7-2.1-0.7
              c-0.8,0-1.5,0.2-2,0.6c-0.5,0.4-0.8,0.9-0.8,1.5h-2.3c0-0.7,0.2-1.3,0.7-1.9c0.5-0.6,1.1-1.1,1.9-1.5c0.8-0.4,1.7-0.5,2.6-0.5
              c1.5,0,2.7,0.4,3.6,1.1c0.9,0.8,1.3,1.8,1.3,3.1v6.1c0,1.2,0.2,2.2,0.5,2.9v0.2H168.9z M165.2,315.5c0.7,0,1.4-0.2,2-0.5
              c0.6-0.4,1.1-0.8,1.4-1.4v-2.7h-1.8c-2.8,0-4.2,0.8-4.2,2.4c0,0.7,0.2,1.3,0.7,1.7C163.8,315.3,164.5,315.5,165.2,315.5z"/>
          </g>
          <g>
            <path className="st31" d="M186.9,309.3h-12.2v-1.8h12.2V309.3z"/>
          </g>
          <g>
            <path className="st31" d="M202,310.7c0,2-0.5,3.6-1.4,4.9s-2.2,1.8-3.7,1.8c-1.7,0-3-0.6-3.9-1.8l-0.1,1.5h-2.1v-18.8h2.3v7
              c0.9-1.1,2.2-1.7,3.8-1.7s2.9,0.6,3.8,1.8s1.4,2.9,1.4,5V310.7z M199.7,310.5c0-1.5-0.3-2.7-0.9-3.6s-1.4-1.3-2.6-1.3
              c-1.5,0-2.6,0.7-3.2,2.1v5.7c0.7,1.4,1.8,2.1,3.2,2.1c1.1,0,1.9-0.4,2.5-1.3C199.4,313.4,199.7,312.2,199.7,310.5z"/>
          </g>
        </g>
        <g>
          <ellipse className="st29" cx="55.8" cy="81.5" rx="6.1" ry="1.6"/>
        </g>
      </g>
      </svg>
    );
  }
});

module.exports = RouteComponent;



