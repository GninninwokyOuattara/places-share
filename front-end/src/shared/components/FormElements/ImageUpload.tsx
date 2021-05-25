import React, { useRef, useState, useEffect } from "react";

import Button from "../../components/FormElements/Button";
import "./ImageUpload.css";

const ImageUpload: React.FC<any> = (props) => {
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
    const [isValid, setIsValid] = useState(false);

    const pickerRef = useRef<HTMLInputElement>(null);

    const pickImageHandler = () => {
        if (pickerRef.current !== null) {
            pickerRef.current.click();
        }
    };

    const pickedHandler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        let pickedFile;
        let fileIsValid;
        if (pickerRef.current?.files && pickerRef.current?.files.length !== 0) {
            const file = pickerRef.current.files[0]!;
            setFile(file);
            setIsValid(true);

            fileIsValid = true;
            pickedFile = file;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    useEffect(() => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
    }, [file]);

    return (
        <div className="form-control">
            <input
                id={props.id}
                type="file"
                name=""
                style={{ display: "none" }}
                ref={pickerRef}
                accept=".jpg;.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {!previewUrl ? (
                        <p>Pick a profile picture</p>
                    ) : (
                        <img src={previewUrl as string} alt="Preview" />
                    )}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
