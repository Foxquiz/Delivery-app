import { forwardRef } from "react";
import { SearchInputProps } from "./SearchInput.props";
import styles from './SearchInput.module.css'
import clsx from "clsx";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput({ className, ...props }, ref) {
    return (
        <input ref={ref} className={clsx(styles['input'], className)} {...props} />
    )
}
)

export default SearchInput;