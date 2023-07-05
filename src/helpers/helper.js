export function functionToGenerateErrorEvent(start, end) {
    console.log('errorEvent from ' + start + ' to ' + end)
    return {
        start: start,
        end: end,
        title: 'Errore',
        content: 'Errore nella lettura degli eventi',
        contentFull: 'Errore nella lettura degli eventi', 
        class: 'backendError',
        background: true
    };
}