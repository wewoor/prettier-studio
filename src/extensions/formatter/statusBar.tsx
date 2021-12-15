import React from 'react';
import { connect } from '@dtinsight/molecule/esm/react';
import { IEditor } from '@dtinsight/molecule/esm/model';
import molecule from '@dtinsight/molecule';
import { Icon } from '@dtinsight/molecule/esm/components';

export const LanguageType = connect(molecule.editor, function ({ current }: IEditor) {
    const language: string = current?.tab?.data?.language || 'Unknown';
    return (
        <span>
           Source Language: { language.toUpperCase() }
        </span>
    );
});


export const GotoGithub = connect(molecule.editor, function ({ current }: IEditor) {
    return (
        <Icon type="github" title="Open the GitHub repo" onClick={() => window.open('https://github.com/wewoor/online-code-formatting') }/>
    );
});
