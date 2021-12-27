import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useTranslation} from "react-i18next";
import InstrumentsTable from "src/pages/admin/InstrumentsTable";
import VocalsTable from "src/pages/admin/VocalsTable";
import TopicsTable from "src/pages/admin/TopicsTable";

const Administration = () => {
    const {t} = useTranslation();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={t('pages.songs.common.instruments')} value="1"/>
                        <Tab label={t('pages.songs.common.topics')} value="2"/>
                        <Tab label={t('pages.songs.common.vocals')} value="3"/>
                        <Tab label={t('pages.songs.common.authors')} value="4"/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{p: 0, pt: 1}}><InstrumentsTable/></TabPanel>
                <TabPanel value="2" sx={{p: 0, pt: 1}}><TopicsTable/></TabPanel>
                <TabPanel value="3" sx={{p: 0, pt: 1}}><VocalsTable/></TabPanel>
                <TabPanel value="4">{t('pages.songs.common.authors')}</TabPanel>
            </TabContext>
        </Box>
    );
};

export default Administration;