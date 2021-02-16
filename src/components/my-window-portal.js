import React, {useEffect} from "react";
import ReactDOM from 'react-dom'

function copyStyles(sourceDoc, targetDoc) {
    const styleSheets = Array.from(sourceDoc.styleSheets).filter(
        (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
    );
    styleSheets.forEach(styleSheet => {
        if (styleSheet.cssRules) {
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach(cssRule => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}

const MyWindowPortal = (props) => {
    const containerEl = document.createElement('div');
    let externalWindow = null;
    const beforeunload = () => {
        props.closeWindowPortal();
    }
    useEffect(() => {
        externalWindow = window.open('', '', 'width=800,height=600,left=200,top=200');
        externalWindow.document.body.appendChild(containerEl);
        externalWindow.document.title = 'A React portal window';
        copyStyles(document, externalWindow.document);
        externalWindow.addEventListener('beforeunload', beforeunload);
        return () => {
            externalWindow.removeEventListener('beforeunload', beforeunload);
            externalWindow.close();
        }
    }, [])
    return ReactDOM.createPortal(props.children, containerEl);
}

export default MyWindowPortal;