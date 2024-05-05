package com.atyanidan.service;

import com.atyanidan.entity.FormResponse;
import com.atyanidan.entity.HealthRecord;
import com.atyanidan.entity.Taluka;
import com.atyanidan.utils.UnHealthyCountByDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatsServiceImpl implements StatsService {
    private TalukaService talukaService;
    private FormResponseService formResponseService;

    @Autowired
    public StatsServiceImpl(TalukaService talukaService, FormResponseService formResponseService) {
        this.talukaService = talukaService;
        this.formResponseService = formResponseService;
    }

    @Override
    public List<UnHealthyCountByDate> getHealthCountByDate(int districtId) {
        List<Taluka> talukas = talukaService.getTalukasFromDistrictId(districtId);
        List<FormResponse> totalFormResponses = new ArrayList<>();
        Map<LocalDate, Integer> countMap = new HashMap<>();
        for (Taluka taluka : talukas) {
            System.out.println(taluka.getName());
            List<FormResponse> responsesByTaluka = formResponseService.findAllByFieldWorkerTaluka(taluka);
            System.out.println(responsesByTaluka);
            for (FormResponse response : responsesByTaluka) {
                LocalDate date = response.getSubmittedOn().toLocalDateTime().toLocalDate();
                countMap.put(date, countMap.getOrDefault(date, 0) + 1);
            }
        }
        List<UnHealthyCountByDate> unHealthyCountByDateList = new ArrayList<>();
        for (LocalDate date : countMap.keySet()) {
            unHealthyCountByDateList.add(new UnHealthyCountByDate(date, countMap.get(date)));
        }
        unHealthyCountByDateList = unHealthyCountByDateList.stream()
                .sorted(Comparator.comparing(UnHealthyCountByDate::getDate))
                .collect(Collectors.toList());
        int size = unHealthyCountByDateList.size();
        return unHealthyCountByDateList.subList(size - 7, size);
    }
}
