// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
// import styles from './index.less';

// const HomePage: React.FC = () => {
//   const { name } = useModel('global');
//   return (
//     <PageContainer ghost>
//       <div className={styles.container}>
//         <Guide name={trim(name)} />
//       </div>
//     </PageContainer>
//   );
// };

// export default HomePage;


// import React, { useEffect, useState } from 'react';
import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

const editorConfiguration = {
    plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: [ 'bold', 'italic' ]
};

const HomePage: React.FC = () => {

    // const [editor, setEditor] = useState();

    // useEffect(()=>{
    //     return;
    //     const element = document.querySelector( '#editor1' );
    //     // Instantiate the editor using the `create` method.
    //     ClassicEditor.create( element, {
    //         plugins: [
    //             Essentials,
    //             Paragraph
    //         ]
    //     } ).then( editor => {
    //         setEditor(editor)
    //         // window.editor = editor;
    //     } )
    //     return ()=>{
    //         console.log(editor);
    //         debugger
    //     }
    // },[editor])

    return (
        <div className="App">
            <h2>Using CKEditor 5 from source in React</h2>

            <div id="editor1">
                233
            </div>

            <CKEditor
                editor={ ClassicEditor }
                config={ editorConfiguration }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>
    );
}

export default HomePage;