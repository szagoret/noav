import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useTranslation} from "react-i18next";
import AuthorsAdminTable from "src/pages/admin/AuthorsAdminTable";
import InstrumentsAdminTable from "src/pages/admin/InstrumentsAdminTable";
import TopicsAdminTable from "src/pages/admin/TopicsAdminTable";
import VocalsAdminTable from "src/pages/admin/VocalsAdminTable";

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
                        <Tab disableRipple label={t('pages.songs.common.instruments')} value="1"/>
                        <Tab disableRipple label={t('pages.songs.common.topics')} value="2"/>
                        <Tab disableRipple label={t('pages.songs.common.vocals')} value="3"/>
                        <Tab disableRipple label={t('pages.songs.common.authors')} value="4"/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{p: 0, pt: 1}}><InstrumentsAdminTable/></TabPanel>
                <TabPanel value="2" sx={{p: 0, pt: 1}}><TopicsAdminTable/></TabPanel>
                <TabPanel value="3" sx={{p: 0, pt: 1}}><VocalsAdminTable/></TabPanel>
                <TabPanel value="4" sx={{p: 0, pt: 1}}><AuthorsAdminTable/></TabPanel>
            </TabContext>
        </Box>
    );
};

export default Administration;