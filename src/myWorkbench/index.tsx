import 'reflect-metadata';
import { container } from 'tsyringe';
import React from 'react';

import { EditorView } from '@dtinsight/molecule/esm//workbench/editor';
import { StatusBarView } from '@dtinsight/molecule/esm//workbench/statusBar';

import { ID_APP } from '@dtinsight/molecule/esm/common/id';
import { APP_PREFIX } from '@dtinsight/molecule/esm/common/const';
import { classNames, getFontInMac, prefixClaName } from '@dtinsight/molecule/esm/common/className';

import { connect } from '@dtinsight/molecule/esm/react';

import { ILayoutController, LayoutController } from '@dtinsight/molecule/esm/controller/layout';
import { LayoutService } from '@dtinsight/molecule/esm/services';
import { ILayout } from '@dtinsight/molecule/esm/model/workbench/layout';
import { IWorkbench } from '@dtinsight/molecule/esm/model/workbench';

const mainBenchClassName = prefixClaName('mainBench');
const workbenchClassName = prefixClaName('workbench');
const appClassName = classNames(APP_PREFIX, getFontInMac());

const layoutController = container.resolve(LayoutController);
const layoutService = container.resolve(LayoutService);

function WorkbenchView(props: IWorkbench & ILayout & ILayoutController) {
    const {
        statusBar,
    } = props;

    return (
        <div id={ID_APP} className={classNames(appClassName, 'myMolecule')} tabIndex={0}>
            <div className={workbenchClassName}>
                <div className={mainBenchClassName}>
                    <EditorView />
                </div>
            </div>
            {!statusBar.hidden && <StatusBarView />}
        </div>
    );
}

export default connect(
    layoutService,
    WorkbenchView,
    layoutController
);
