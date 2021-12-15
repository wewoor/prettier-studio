import molecule from '@dtinsight/molecule';
import { Float, IEditorTab } from '@dtinsight/molecule/esm/model';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { editor as MonacoEditor } from '@dtinsight/molecule/esm/monaco';
import { GotoGithub, LanguageType } from './statusBar';

const leftGroupPane = 1;
const rightGroupPane = 2;

const sourceEditor: IEditorTab = {
    id: '1',
    name: 'Source Code ',
    closable: false,
    data: {
        language: 'json',
    },
};

const formattedEditor: IEditorTab =  {
    id: '2',
    closable: false,
    name: 'Formatted ',
    data: {
        language: 'json',
    },
}

export const FormatterExtension: IExtension = {
    id: 'ExtendDataSync',
    name: 'Data Sync',
    activate: async () => {
        // Hidden the useless Panel
        molecule.layout.toggleMenuBarVisibility();
        molecule.layout.togglePanelVisibility();
        molecule.layout.toggleSidebarVisibility();
        molecule.layout.toggleActivityBarVisibility();

        molecule.editor.open(sourceEditor, leftGroupPane);
        molecule.editor.open(formattedEditor, rightGroupPane);
    
        molecule.statusBar.add({
            id: 'LanguageType',
            render: () => <LanguageType />
        }, Float.left);

         molecule.statusBar.add({
            id: 'gotoGithub',
            render: () => <GotoGithub />
        }, Float.right);

        // Set the colorTheme
        molecule.colorTheme.setTheme('GitHub Plus');
    
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

        editor.onDidChangeModelContent(() => {
            const value = editor.getValue();
            let formatting = '';

            try {
                formatting = JSON.stringify(JSON.parse(value), null, 2);
            } catch (e) {
                formatting = value;
            }
            formattingEditor.setValue(formatting);
        }) as any;
    },
    dispose() {},
};
