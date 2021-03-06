/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISignService } from 'vs/platform/sign/common/sign';
import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';

export class SignService implements ISignService {

	_serviceBrand!: ServiceIdentifier<ISignService>;

	private readonly _tkn: string | null;

	constructor(token: string | undefined) {
		this._tkn = token || null;
	}

	async sign(value: string): Promise<string> {
		return Promise.resolve(this._tkn || '');
	}
}
