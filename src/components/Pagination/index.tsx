import React from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {

    /**
     *  The current page number
     */
    currentPage: number;

    /**
     * The total number of pages to display
     */
    pageCount?: number;

    /**
     * The number of pages to display around the current page
     */
    pageRangeDisplayed?: number;

    /**
     * The number of pages to display at the beginning and end of the pagination
     */
    marginPagesDisplayed?: number;

    /**
     * The label for the "previous" button
     */
    previousLabel?: React.ReactNode;

    /**
     * The label for the "next" button
     */
    nextLabel?: React.ReactNode;

    /**
     * The label for the "break" ellipsis
     */
    breakLabel?: React.ReactNode;

    // breakAriaLabel?: string;

    /**
     * The class name for the "break"
     */
    breakClassName?: string;

    /**
     * The class name for the "break" link element
     */
    breakLinkClassName?: string;

    /**
     * The class name for the pagination container element
     */
    containerClassName?: string;

    /**
     * The class name for each page element
     */
    pageClassName?: string;

    /**
     * The class name for each page link element
     */
    pageLinkClassName?: string;

    /**
     * The class name for the active page element
     */
    activeClassName?: string;

    /**
     * The event to listen to before changing the selected page
     * Default value: "onClick"
     */
    eventListener?: string;

    /**
     * The rel property on the <a> tag for the previous page control
     * Default value: "prev"
     * Set to null to disable
     */
    prevRel?: string | null;

    /**
     * The class name for the active page link element
     * @deprecated Use activeClassName instead
     * @see activeClassName
     */
    activeLinkClassName?: string;

    /**
     * The class name for the "previous" button element
     */
    previousClassName?: string;

    /**
     * The class name for the "previous" button link element
     */
    previousLinkClassName?: string;

    /**
     * The class name for the "next" button element
     */
    nextClassName?: string;

    /**
     * The class name for the "next" button link element
     */
    nextLinkClassName?: string;

    /**
     * The class name for disabled page elements and buttons
     */
    disabledClassName?: string;

    /**
     * The class name for disabled page link elements and buttons
     */
    disabledLinkClassName?: string;

    /**
     * Control the visibility of a legend or label that describes the pagination
     */
    hideLegand?: boolean;

    /**
     * The number of items to display per page
     */
    pageSize: number,

    /**
     * The total number of items to paginate through
     */
    totalItems: number,

    /**
     * The number of pages to display in the navigation before displaying ellipsis
     */
    maxDisplayedPages?: number;

    /**
     * The maximum number of items to display in the pagination component
     */
    maxItems?: number;

    /**
     * Show or hide the previous and next buttons
     */
    showPreviousNextButtons?: boolean;

    /**
     * Show or hide the first and last buttons
     */
    showFirstLastButtons?: boolean;

    /**
     * The label for the "first" button
     */
    firstLabel?: React.ReactNode;

    /**
     * The label for the "last" button
     */
    lastLabel?: React.ReactNode;

    /**
     * The class name for the "first" button element
     */
    firstClassName?: string;

    /**
     * The class name for the "first" button link element
     */
    firstLinkClassName?: string;

    /**
     * The class name for the "last" button element
     */
    lastClassName?: string;

    /**
     * The class name for the "last" button link element
     */
    lastLinkClassName?: string;

    /**
     * The class name for the custom navigation container
     */
    customNavContainerClassName?: string;

    /**
     * The class name for the custom navigation element
     */
    customNavElementClassName?: string;

    /**
     * The class name for the custom navigation active element
     */
    customNavActiveElementClassName?: string;

    /**
     * The class name for the custom navigation disabled element
     */
    customNavDisabledElementClassName?: string;

    /**
     * The class name for the custom navigation previous element
     */
    customNavPreviousElementClassName?: string;

    /**
     * The class name for the custom navigation next element
     */
    customNavNextElementClassName?: string;

    /**
     * Customize the navigation labels and their respective page numbers
     */
    customNavLabels?: { [label: string]: number };

    /**
     * Show or hide the jump to first and jump to last buttons
     */
    showJumpToFirstLastButtons?: boolean;

    /**
     * The label for the "jump to first" button
     */
    jumpToFirstLabel?: React.ReactNode;

    /**
     * The label for the "jump to last" button
     */
    jumpToLastLabel?: React.ReactNode;

    /**
     * Callback function for when a new page is selected
     * @param page The new page number
     */
    onPageChange: (page: number) => void;

    /**
     * Callback function for when an active page is clicked
     * @param page The active page object
     */
    onPageActive?: (page: number) => void;

    /**
     * Function called to generate the href attribute value on each page element's link
     * @param page The page number
     * @returns The href attribute value
     */
    hrefBuilder?: (page: number) => string;

    /**
     * Function to set the text on page links
     * @param page The page number
     * @returns The label for the page link
     */
    pageLabelBuilder?: (page: number) => React.ReactNode;

    /**
     * Function called to generate the aria-label attribute value on each page link
     * @param page The page number
     * @returns The aria-label attribute value
     */
    ariaLabelBuilder?: (page: number) => string;

    /**
     * Callback function for when the page size is changed
     * @param pageSize The new page size
     */
    onPageSizeChange?: (pageSize: number) => void;

}

/**
 * Pagination component for displaying page numbers and handling page changes.
 * @param {Object} props - The props object for the Pagination component.
 * @returns {JSX.Element} - The Pagination component.
 */
interface PaginationState {
    totalPages: number;
    pages: number[];
}
class Pagination extends React.Component<PaginationProps, PaginationState> {
    constructor(props: PaginationProps) {
        super(props);

        const { pageSize, totalItems } = props;

        this.state = {
            totalPages: Math.ceil(totalItems / pageSize),
            pages: [],
        };
    }

    componentDidMount() {
        this.updatePages();
    }

    componentDidUpdate(prevProps: PaginationProps) {
        if (
            prevProps.totalItems !== this.props.totalItems ||
            prevProps.pageSize !== this.props.pageSize
        ) {
            this.updatePages();
        }
    }

    updatePages() {
        this.buildPages();
    }

    buildPages() {
        const { totalItems, pageSize } = this.props;
        const totalPages = Math.ceil(totalItems / pageSize);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        this.setState({
            totalPages,
            pages,
        });
    }

    handlePageClick(pageNumber: number) {
        const { onPageChange } = this.props;
        onPageChange(pageNumber);
    }

    render() {
        const {
            currentPage = 1,
            // pageCount = 10,
            pageRangeDisplayed = 6,
            marginPagesDisplayed = 2,
            previousLabel = <span>Previous</span>,
            nextLabel = <span>Next</span>,
            breakLabel = <span>...</span>,
            breakClassName,
            // onPageChange,
            containerClassName,
            // pageClassName,
            // activeClassName,
            previousClassName,
            // previousLinkClassName,
            nextClassName,
            // disabledClassName,
            // disabledLinkClassName,
            hideLegand = false,
            // nextLinkClassName,
            pageSize,
            totalItems,
        } = this.props;

        const { totalPages} = this.state;

        const firstItem = (currentPage - 1) * pageSize + 1;
        const lastItem = Math.min(currentPage * pageSize, totalItems);
        const pageRange: number = Math.min(totalPages, pageRangeDisplayed);
        const sidePages: number = Math.min(marginPagesDisplayed, pageRange - 2);
        const startPage: number = Math.max(2, currentPage - sidePages);
        const endPage: number = Math.min(totalPages - 1, currentPage + sidePages);

        return (
            <>
                {totalPages > 0 ? (
                    <div
                        className={containerClassName ?? 'tailwind-paginate pagination'}
                    >
                        <div className={'container-mobile hidden'}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => this.handlePageClick(currentPage - 1)}
                                className={previousClassName ?? `relative  inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-skin-base rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition ease-in-out duration-150`}
                            >
                                <ChevronLeft className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
                                {previousLabel}
                            </button>
                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => this.handlePageClick(currentPage + 1)}
                                className={nextClassName ?? "relative inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-skin-base rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition ease-in-out duration-150"}
                            >
                                {nextLabel}
                                <ChevronRight className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
                            </button>
                        </div>
                        <div className={'container-desktop'}>
                            {hideLegand ? <div /> :
                                <div>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 leading-5">
                                        Showing <span className="font-medium">{firstItem}</span> to{" "}
                                        <span className="font-medium">{lastItem}</span> of{" "}
                                        <span className="font-medium">{totalItems}</span> results
                                    </p>
                                </div>
                            }
                            <div className={'relative z-0 shadow-box-s order-1 flex w-fit items-center gap-4 rounded-md p-3 text-sm font-semibold md:gap-6 md:px-6 lg:order-none min-[2560px]:text-3xl'}>
                                <button
                                    onClick={() => this.handlePageClick(currentPage - 1)}
                                    rel="prev"
                                    aria-label="{{ __('pagination.previous') }}"
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
                                </button>

                                {startPage > 3 && <button
                                    onClick={() => this.handlePageClick(1)}
                                    className={`${startPage === currentPage && `flex cursor-pointer items-center justify-center rounded-md bg-black p-1 px-3 text-white min-[2560px]:p-6`}`}
                                    aria-label="Go to page :1"
                                >
                                    1
                                </button>}
                                {startPage > 4 && <button
                                    aria-disabled="true"
                                    className={breakClassName ?? "py-2 px-3 leading-tight text-black"}
                                >
                                    {breakLabel}
                                </button>}
                                {/* all pages */}
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const page = i + 1;

                                    if (page >= currentPage - 2 && page <= currentPage + 2) {
                                        return <button
                                            key={i}
                                            onClick={() => this.handlePageClick(page)}
                                            className={`${page === currentPage && `flex items-center justify-center rounded-md bg-black p-1 px-3 text-white min-[2560px]:p-6`}`}
                                            aria-label={`Go to page ${page}`}
                                            disabled={page === currentPage}
                                        >
                                            {page}
                                        </button>
                                    }
                                    return null;
                                })}
                                {endPage < totalPages - 3 && <button
                                    aria-disabled="true"
                                    className={breakClassName ?? "py-2 px-3 leading-tight text-black"}
                                >
                                    {breakLabel}
                                </button>}
                                {endPage < totalPages - 2 && <button
                                    onClick={() => this.handlePageClick(totalPages)}
                                    className={`${totalPages === currentPage && `flex items-center justify-center rounded-md bg-black p-1 px-3 text-white min-[2560px]:p-6`}`}
                                    aria-label={`Go to page :${totalPages}`}
                                >
                                    {totalPages}
                                </button>}
                                <button
                                    onClick={() => this.handlePageClick(currentPage + 1)}
                                    rel="next"
                                    aria-label="pagination.next"
                                    disabled={currentPage >= totalPages}
                                >
                                    <ChevronRight className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
                {/* className={activeClassName ?? "relative inline-flex items-center py-2 px-3 leading-tight text-skin-600 bg-skin-50 border border-skin-300 cursor-pointer hover:bg-skin-100 hover:text-skin-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"} */}
            </>
        );
    }
}

export default Pagination;
