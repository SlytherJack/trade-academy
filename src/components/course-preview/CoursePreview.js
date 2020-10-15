import { Typography } from '@material-ui/core';
import React from 'react';
import CoursePreviewClass from '../course-preview-class/CoursePreviewClass';
import './CoursePreview.scss';

function CoursePreview(props) {
    const { name, classes } = props.course;

    return (
        <div className="course-preview-container">
            <Typography className="name" variant="h6" gutterBottom>
                {name}
            </Typography>

            <div className="classes-container">
                {
                    classes.map((c, index) => {
                        return (
                            <CoursePreviewClass
                                classData={c}
                                index={index}
                            ></CoursePreviewClass>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CoursePreview;
