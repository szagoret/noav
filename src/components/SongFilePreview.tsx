import React, {useState} from "react";
import {SongFileType} from "src/types/SongFileType";
import {Box, Button, MobileStepper} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import SwipeableViews from 'react-swipeable-views';
import {ThumbnailType} from "src/types/ThumbnailType";
import {useTranslation} from "react-i18next";

const SongFilePreview = ({
                             songCode,
                             file,
                             previewType = 'LG'
                         }: { songCode: string, file: SongFileType, previewType?: 'SM' | 'LG' }) => {
    const thumbnails = file?.thumbnails?.filter(t => t.type === previewType) || [];
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = thumbnails.length;

    const {t} = useTranslation();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const imgSrc = (thumbnail: ThumbnailType) => `${process.env.REACT_APP_API_BASE_URL}/api/song/${songCode}/files/${file.code}/thumbs/${thumbnail.code}`;

    return (
        <Box sx={{flexGrow: 1}}>
            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {thumbnails.map((thumbnail, index) => (
                    <div key={thumbnail.sequence}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={imgSrc(thumbnail)}
                                alt={file?.name}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {t('common.next')}
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft/>
                        {t('common.back')}
                    </Button>
                }
            />
        </Box>
    );
};

export default SongFilePreview;