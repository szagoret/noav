import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';
import React, { useMemo } from 'react';


const SongFileIcon = ({ extension }) => {

  const ExtensionIcon = useMemo(() => {
    switch (extension) {
      case 'pdf' :
        return <PictureAsPdfIcon sx={{ color: '#f72a2ad4' }}/>;
      case 'jpg' :
      case 'jpeg' :
      case 'png' :
        return <InsertPhotoTwoToneIcon color={'secondary'}/>;
      default:
        return <DescriptionIcon color={'disabled'}/>;
    }
  }, [extension]);


  return (<>{ExtensionIcon}</>);
};

export default SongFileIcon;