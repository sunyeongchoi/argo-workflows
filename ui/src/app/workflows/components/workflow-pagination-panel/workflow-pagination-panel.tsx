import * as React from 'react';
import { Pagination, parseLimit } from '../../pagination';
import { WarningIcon } from '../../../shared/components/fa-icons';

export function WorkflowPaginationPanel(props: {pagination: Pagination; onChange: (pagination: Pagination) => void; numRecords: number}) {
    const [k8sOffset, archivedOffset] = props.pagination.offset.split(',');
    const isFirstDisabled = !k8sOffset && !archivedOffset;

    const [k8sNextOffset, archivedNextOffset] = props.pagination.nextOffset.split(',');
    const isNextDisabled = !k8sNextOffset && !archivedNextOffset;
    return (
        <p style={{paddingBottom: '45px'}}>
            <button disabled={isFirstDisabled} className='argo-button argo-button--base-o' onClick={() => props.onChange({limit: props.pagination.limit, offset: ',', nextOffset: ','})}>
                First page
            </button>
            <button
                disabled={isNextDisabled}
                className='argo-button argo-button--base-o'
                onClick={() =>
                    props.onChange({
                        limit: props.pagination.limit,
                        offset: props.pagination.nextOffset,
                        nextOffset: ',',
                    })
                }>
                Next page <i className='fa fa-chevron-right' />
            </button>
            {/* if pagination is used, and we're either not on the first page, or are on the first page and have more records than the page limit */}
            {props.pagination.limit > 0 && (props.pagination.offset || (!props.pagination.offset && props.numRecords >= props.pagination.limit)) ? (
                <>
                    <WarningIcon /> Workflows cannot be globally sorted when paginated
                </>
            ) : (
                <span />
            )}
            <small className='fa-pull-right'>
                <select
                    className='small'
                    onChange={e => {
                        const limit = parseLimit(e.target.value);
                        const newValue: Pagination = { limit, offset: ',', nextOffset: ',' };
                        props.onChange(newValue);
                    }}
                    value={props.pagination.limit || 0}>
                    {[5, 10, 20, 50, 100, 500, 0].map(limit => (
                        <option key={limit} value={limit}>
                            {limit === 0 ? 'all' : limit}
                        </option>
                    ))}
                </select>{' '}
                results per page
            </small>
        </p>
    );
}
