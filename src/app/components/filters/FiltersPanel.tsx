import type { FiltersPanelProps } from "@/types/components";
import styles from './Filters.module.css'

export default function FiltersPanel({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FiltersPanelProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.search}
          placeholder="Buscar personaje..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />

        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={status}
            onChange={e => onStatusChange(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
    </div>
  );
}
