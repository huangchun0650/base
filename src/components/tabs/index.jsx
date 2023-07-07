import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

function TabSelector(props) {
  const { data } = props;

  const parseHTMLString = (htmlString) => {
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: htmlString }
    });
  };

  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        {data.map((tab, index) => (
          <Tab key={index}
            _selected={{ color: 'red.500', borderBottom: '2px solid red' }}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {parseHTMLString(tab.content)}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default TabSelector;
