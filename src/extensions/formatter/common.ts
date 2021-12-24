import molecule from "@dtinsight/molecule";
import { editor as MonacoEditor } from "@dtinsight/molecule/esm/monaco";
import { IEditorTab } from "@dtinsight/molecule/esm/model";

export const BuiltInLanguages = ['JSON', 'XML', 'SQL', 'Markdown'];

export const leftGroupPane = 1;
export const rightGroupPane = 2;
export const sourceEditor: IEditorTab = {
    id: '1',
    name: 'Source',
    closable: false,
    data: {
        language: 'json',
    },
};

export const formattedEditor: IEditorTab =  {
    id: '2',
    closable: false,
    name: 'Formatted',
    data: {
        language: 'json',
    },
}

export async function getGroupEditors(): Promise<MonacoEditor.IStandaloneCodeEditor[]> {
    const editor = await new Promise<MonacoEditor.IStandaloneCodeEditor>(
        (resolve) => {
            setTimeout(() => {
                resolve(molecule.editor.getGroupById(leftGroupPane)?.editorInstance);
            });
        }
    );
    const formattingEditor = await new Promise<MonacoEditor.IStandaloneCodeEditor>(
        (resolve) => {
            setTimeout(() => {
                resolve(molecule.editor.getGroupById(rightGroupPane)?.editorInstance);
            });
        }
    );

    return [editor, formattingEditor];
}

export async function updateLanguage(language: string) {
    const [ editor, formattingEditor ] = await getGroupEditors();
    const languageId = language.toLowerCase();
    MonacoEditor.setModelLanguage(editor.getModel()!, languageId);
    MonacoEditor.setModelLanguage(formattingEditor.getModel()!, languageId);

    molecule.editor.updateTab(Object.assign({}, sourceEditor, { data: { language: languageId } }), leftGroupPane);
    molecule.editor.updateTab(Object.assign({}, formattedEditor, { data: { language: languageId } }), rightGroupPane);
}