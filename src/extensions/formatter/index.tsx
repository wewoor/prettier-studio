import molecule from '@dtinsight/molecule';
import { IExtension, Float } from '@dtinsight/molecule/esm/model';
import { GotoGithub, GotoMolecule, LanguageType } from './statusBar';
import { SwitchLanguageAction } from './switchLanguage';

import { 
    getGroupEditors, sourceEditor,
    formattedEditor, leftGroupPane, rightGroupPane 
} from './common';

import { prettify } from './prettier';

async function handleEvents() {
    const [ editor, formattingEditor ] = await getGroupEditors();

    editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        const language = editor.getModel()?.getLanguageId()
        let formatting = '';
        try {
            formatting = prettify(language, value);
        } catch (e) {
            formatting = value;
        }
        if (formatting && formattingEditor) {
            formattingEditor.setValue(formatting);
        }
    }) as any;

    formattingEditor.updateOptions({ readOnly: true });

    molecule.statusBar.onClick((e, { id }) => {
        if (id === 'LanguageType') {
            molecule.extension.executeCommand(SwitchLanguageAction.ID);
        }
    });
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

        molecule.statusBar.add({
            id: 'gotoMolecule',
            render: () => <GotoMolecule />
        }, Float.right);

        // Set the colorTheme
        molecule.colorTheme.setTheme('GitHub Plus');
        // Register the actions
        molecule.extension.registerAction(SwitchLanguageAction);
    
        handleEvents();
    },
    dispose() {},
};
