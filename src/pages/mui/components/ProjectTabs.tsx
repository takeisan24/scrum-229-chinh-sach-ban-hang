import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ACTIVE_TAB_BG_MOBILE, BRAND_GRADIENT, colors } from '../../../constants/designTokens';
import { PROJECT_TABS, type ProjectTabId } from '../../../constants/projectTabs';

interface ProjectTabsProps {
  value: ProjectTabId;
  onChange: (value: ProjectTabId) => void;
}

export default function ProjectTabs({ value, onChange }: ProjectTabsProps) {
  return (
    <Box sx={{ background: BRAND_GRADIENT, borderRadius: '16px', p: 2 }}>
      <Tabs
        value={value}
        onChange={(_event, next: ProjectTabId) => onChange(next)}
        // Du cho: gian deu 7 tab. Thieu cho: cuon ngang, MUI tu cuon tab dang chon vao tam nhin.
        variant="scrollable"
        scrollButtons={false}
        aria-label="Thông tin dự án"
        sx={{
          minHeight: 0,
          '& .MuiTabs-indicator': { display: 'none' },
          // MUI v9 doi ten class `MuiTabs-flexContainer` -> `MuiTabs-list`
          '& .MuiTabs-list': { gap: { xs: 2, md: 3 }, justifyContent: 'space-between' },
        }}
      >
        {PROJECT_TABS.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={tab.label}
            icon={<Box component="img" src={tab.icon} alt="" sx={{ width: { xs: 20, md: 24 }, height: { xs: 20, md: 24 } }} />}
            iconPosition="start"
            id={`tab-${tab.id}`}
            aria-controls={`tabpanel-${tab.id}`}
            sx={{
              minWidth: 0,
              maxWidth: 'none',
              minHeight: 0,
              px: { xs: 2, md: 3 },
              py: { xs: '10px', md: 2 },
              borderRadius: '32px',
              color: colors.primary100,
              fontSize: { xs: 13, md: 15 },
              fontWeight: 500,
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
              '& .MuiTab-icon': { mr: 1, mb: 0 },
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
              '&.Mui-selected': {
                color: colors.primary100,
                fontWeight: 600,
                // Figma: web nen primary dac, mobile nen primary 50%
                bgcolor: { xs: ACTIVE_TAB_BG_MOBILE, md: colors.primary },
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
