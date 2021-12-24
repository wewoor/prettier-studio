import {
    Action2,
    KeybindingWeight,
} from '@dtinsight/molecule/esm/monaco/common';
import { KeyCode, KeyMod } from '@dtinsight/molecule/esm/monaco';
import {
    IQuickInputService,
    //@ts-ignore
} from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
//@ts-ignore
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';

import { 
    updateLanguage, BuiltInLanguages,
} from './common';
import molecule from '@dtinsight/molecule';

export class SwitchLanguageAction extends Action2 {
    static readonly ID = 'SwitchLanguageAction';
    static readonly LABEL = 'Select a language';

    constructor() {
        super({
            id: SwitchLanguageAction.ID,
            label: SwitchLanguageAction.LABEL,
            title: SwitchLanguageAction.LABEL,
            alias: SwitchLanguageAction.LABEL,
            precondition: undefined,
            f1: true, // Whether show the QuickOpenFile in Command Palette
            keybinding: {
                // Keybinding
                weight: KeybindingWeight.WorkbenchContrib,
                when: undefined,
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyL),
            },
        });
    }

    run(accessor: any, ...args: any[]) {
        const quickInputService = accessor.get(IQuickInputService); // Get the quickInput

        const quickPick = quickInputService.createQuickPick();
        quickPick.items = BuiltInLanguages.map((language) => ({ label: language }));
        quickPick.placeholder = SwitchLanguageAction.LABEL;
        const activeLanguage: string = molecule.editor.getState()?.current?.tab?.data.language;

        quickPick.activeItems = [{ label: activeLanguage }];
        quickPick.canSelectMany = false;

        quickPick.onDidAccept(async (i: any) => {
            const item = quickPick.activeItems[0];
            if (item) {
                updateLanguage(item.label);
            }
            quickPick.hide();
        });
        quickPick.show();
    }
}
