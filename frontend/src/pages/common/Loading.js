import loading from './loading.svg';

function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
            <img alt='loading...' src={loading} style={{ height: '20em' }} />
        </div>
    );
}

export default Loading;