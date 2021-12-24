import { format as formatSQL } from 'sql-formatter';
import formatXML from 'xml-formatter';
//@ts-ignore
import prettier from 'prettier/esm/standalone.mjs';
//@ts-ignore
import parserMarkdown from 'prettier/esm/parser-markdown.mjs';

export function prettify(language: string | undefined, code: string): string {
    switch (language) {

        case 'json': {
            return JSON.stringify(JSON.parse(code), null, 2);
        }

        case 'xml': { 
            return formatXML(code);
        }

        case 'sql': { 
            return formatSQL(code, {
                uppercase: true,
                indent: '    ',
                linesBetweenQueries: 2
            });
        }

        case 'markdown': { 
            return prettier.format(code, {
                parser: "markdown",
                plugins: [parserMarkdown],
              });;
        }

        default: {
            return code;
        }
    }
}
