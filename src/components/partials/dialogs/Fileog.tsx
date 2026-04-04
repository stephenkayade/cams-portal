import React, { useEffect, useImperativeHandle, forwardRef, useRef, ForwardedRef, useState, useContext } from "react"
import { IFileog, IFileogRef, IFileUpload, } from "../../../utils/interfaces.util";
import useSidebar from "../../../hooks/useSidebar";
import useToast from "../../../hooks/useToast";

const Fileog = forwardRef((props: IFileog, ref: ForwardedRef<IFileogRef>) => {

    const {
        accept,
        type,
        sizeLimit = 5,
        raw = false,
        multiple = false,
        onSelect
    } = props;

    const KILOBYTE = 1024;
    const fileRef = useRef<HTMLInputElement>(null);

    const { toast, setToast } = useToast()
    const [file, setFile] = useState<IFileUpload | null>(null);
    const [files, setFiles] = useState<Array<IFileUpload>>([]);

    useEffect(() => {

    }, [])

    const openDialog = (e?: any) => {
        if (e) { e.preventDefault() }
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const getSize = (size: number): { KB: number, MB: number } => {

        const KB = parseFloat((size / KILOBYTE).toString())
        const MB = parseFloat((KB / 1000).toFixed(2))

        return { KB, MB };

    }

    const browseFile = (e: any) => {

        if (e.target.files && e.target.files[0]) {

            const fileSize = getSize(e.target.files[0].size);

            if (fileSize.MB > sizeLimit) {

                setToast({
                    ...toast,
                    show: true,
                    type: 'error',
                    message: `file cannot be more than ${sizeLimit}MB in size`
                })

            } else {

                getFileSource(e.target.files[0]);

            }

        }

        setTimeout(() => {
            setToast({ ...toast, show: false })
        }, 3500)
    }

    const getFileSource = (data: any) => {

        if (raw) {

            const fileSize = getSize(data.size);
            const ext = fileSize.MB > 0 ? 'MB' : fileSize.KB > 0 ? 'KB' : 'NA';

            setFile({
                raw: data,
                name: data.name,
                size: data.size,
                type: data.type,
                base64: '',
                parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                sizeExt: ext,
                dur: 0
            });

            onSelect([
                {
                    raw: data,
                    name: data.name,
                    size: data.size,
                    type: data.type,
                    base64: '',
                    parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                    sizeExt: ext,
                    dur: 0
                }
            ])

        }

        else {

            const fileSize = getSize(data.size);
            const ext = fileSize.MB > 0 ? 'MB' : fileSize.KB > 0 ? 'KB' : 'NA';

            let reader = new FileReader();

            // as base64
            reader.onloadend = (e: any) => {

                setFile({
                    raw: data,
                    name: data.name,
                    size: data.size,
                    type: data.type,
                    base64: e.target.result,
                    parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                    sizeExt: ext,
                    dur: 0
                });

                onSelect([
                    {
                        raw: data,
                        name: data.name,
                        size: data.size,
                        type: data.type,
                        base64: e.target.result,
                        parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                        sizeExt: ext,
                        dur: 0
                    }
                ])

            };
            reader.readAsDataURL(data);


        }

    }

    const browseFiles = (e: any) => {

        if (e.target.files) {

            const selectedFiles: Array<any> = Array.from(e.target.files);
            let files: Array<IFileUpload> = [];

            for (let i = 0; i < selectedFiles.length; i++) {

                let selFile = selectedFiles[i];
                let fileSize = getSize(selFile.size);
                let ext = fileSize.MB > 0 ? 'MB' : fileSize.KB > 0 ? 'KB' : 'NA';

                if (raw) {

                    files.push({
                        raw: selFile,
                        name: selFile.name,
                        size: selFile.size,
                        type: selFile.type,
                        base64: '',
                        parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                        sizeExt: ext,
                        dur: 0,
                    })


                } else {

                    let reader = new FileReader();

                    reader.onloadend = (e: any) => {
                        files.push({
                            raw: selFile,
                            name: selFile.name,
                            size: selFile.size,
                            type: selFile.type,
                            base64: e.target.result,
                            parsedSize: fileSize.MB > 0 ? fileSize.MB : fileSize.KB,
                            sizeExt: ext,
                            dur: 0,
                        })

                    }
                    reader.readAsDataURL(selFile);

                }

            }

            setFiles(files);
            onSelect(files);

        }

        setTimeout(() => {
            setToast({ ...toast, show: false })
        }, 3500)
    }

    // expose child component functions to parent component
    useImperativeHandle(ref, () => ({
        open: openDialog,
        browse: browseFile,
        getSize: getSize
    }))

    return (
        <>
            <input
                onChange={(e) => {
                    if (multiple) {
                        browseFiles(e)
                    } else {
                        browseFile(e)
                    }
                }}
                ref={fileRef}
                type="file"
                multiple={multiple ? true : false}
                accept={accept ? accept.join(',') : ''}
                className="hidden"
            />
        </>
    )
})

export default Fileog;
