package com.group1.stagesWs;

import com.group1.stagesWs.model.Session;
import java.util.List;

public abstract class SessionManager<T> {

  public static Session CURRENT_SESSION = new Session("HIVER-2021");

  public abstract List<T> getListForCurrentSession(List<T> list);
}
