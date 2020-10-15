import { Typography } from '@material-ui/core';
import React from 'react';
import './CoursePreviewClass.scss';

function CoursePreviewClass(props) {
    const { index, classData } = props;
    const { imgURL, title } = classData;

    return (
        <div className="course-preview-class-container">
            <img src={imgURL} alt="Class Thumbnail"></img>
            <Typography className="class-title" variant="subtitle1" gutterBottom>
                <span className="lesson-number">Lesson {index}</span>{title}
            </Typography>
        </div>
    );
}

export default CoursePreviewClass;
