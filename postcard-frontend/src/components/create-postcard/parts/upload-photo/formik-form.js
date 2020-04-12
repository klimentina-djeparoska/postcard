import {Formik} from "formik";
import yupObject from "yup/lib/object";
import yupMixed from "yup/lib/mixed";
import React from "react";
import {saveImageSanity} from "../../../sanity/sanityClientApi";
import './formik-form.css';


const FormikForm  = (props) => {
    return (
        <div className="mt-lg-5">
            <Formik initialValues={{file: null}}
                    onSubmit={ (values) => {

                        props.onSubmitCheck();
                        saveImageSanity(values.file).then(res => {
                            console.log(res._id);
                            props.onSubmit(res._id);
                        });

                    }}
                    validationSchema={yupObject().shape({
                        file: yupMixed().required(),
                    })}
                    render={({ values, handleSubmit, setFieldValue }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="file" className="font-weight-bold">File upload</label>
                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }} className="form-control" />
                                    <Thumb file={values.file} />
                                </div>
                                {
                                    props.imageSubmit?
                                        <div>{
                                                props.photo?
                                                    <div></div>
                                                    : <div className="bt-submit">Uploading image ...</div>
                                            }
                                        </div>
                                        :<button type="submit" className="btn btn-secondary mb-lg-5 bt-submit">Submit</button>
                                }
                            </form>
                        );
                    }}
            />
        </div>
    );
};


class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
                     alt={file.name}
                     className="img-thumbnail mt-2"
                     height={200}
                     width={200} />);
    }
}

export default FormikForm;
